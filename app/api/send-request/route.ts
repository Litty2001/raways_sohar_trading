import { NextRequest, NextResponse } from "next/server";
import { SERVICE_INTEREST_OPTIONS } from "@/lib/site-content";

export const runtime = "nodejs";

const GRAPH_API_VERSION = "v21.0";
const DEFAULT_PHONE_NUMBER_ID = "1353724421159145";
const DEFAULT_TEMPLATE_NAME = "website_quote_request";
const DEFAULT_TEMPLATE_LANGUAGE = "en";

type QuoteRequest = { firstName: string; lastName: string; company: string; email: string; interest: string; message: string };

const fieldLimits: Record<keyof QuoteRequest, { required: boolean; max: number }> = {
  firstName: { required: true, max: 80 },
  lastName: { required: true, max: 80 },
  company: { required: false, max: 160 },
  email: { required: true, max: 254 },
  interest: { required: true, max: 120 },
  message: { required: true, max: 2_000 },
};

function validateQuoteRequest(payload: unknown): { data: QuoteRequest } | { error: string } {
  if (!payload || typeof payload !== "object") return { error: "Request body must be a JSON object." };
  const candidate = payload as Record<string, unknown>;
  const data = {} as QuoteRequest;

  for (const [field, { required, max }] of Object.entries(fieldLimits) as [keyof QuoteRequest, { required: boolean; max: number }][]) {
    const raw = candidate[field];
    if (raw !== undefined && typeof raw !== "string") return { error: `${field} must be a string.` };
    const value = (raw ?? "").trim();
    if (required && !value) return { error: `${field} is required.` };
    if (value.length > max) return { error: `${field} must be at most ${max} characters.` };
    data[field] = value;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { error: "email must be a valid email address." };
  return { data };
}

// WhatsApp rejects template parameters that are empty or contain newlines, tabs, or 4+ consecutive spaces.
function toTemplateText(value: string) {
  return value.replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, "   ").trim() || "Not provided";
}

function interestLabel(value: string) {
  return SERVICE_INTEREST_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export async function POST(request: NextRequest) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || DEFAULT_PHONE_NUMBER_ID;
  const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER?.replace(/\D/g, "");
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || DEFAULT_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || DEFAULT_TEMPLATE_LANGUAGE;

  const missing = [!accessToken && "WHATSAPP_ACCESS_TOKEN", !recipientNumber && "WHATSAPP_RECIPIENT_NUMBER"].filter(Boolean);
  if (missing.length > 0) {
    console.error(`WhatsApp Cloud API is not configured. Missing env vars: ${missing.join(", ")}`);
    return NextResponse.json({ success: false, error: "Server is not configured to send requests." }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Request body must be valid JSON." }, { status: 400 });
  }
  const result = validateQuoteRequest(payload);
  if ("error" in result) return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  const quote = result.data;

  // Order must match the approved template body: first_name, last_name, company, email, interest, message.
  const parameters = [
    ["first_name", quote.firstName],
    ["last_name", quote.lastName],
    ["company", quote.company],
    ["email", quote.email],
    ["interest", interestLabel(quote.interest)],
    ["message", quote.message],
  ].map(([name, value]) => ({ type: "text", parameter_name: name, text: toTemplateText(value) }));

  const whatsappPayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientNumber,
    type: "template",
    template: {
      name: templateName,
      language: { code: templateLanguage },
      components: [{ type: "body", parameters }],
    },
  };

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(whatsappPayload),
    });
    if (!response.ok) {
      const details: unknown = await response.json().catch(() => null);
      console.error("WhatsApp Cloud API rejected a quote request.", response.status, JSON.stringify(details));
      return NextResponse.json(
        { success: false, error: "WhatsApp API request failed.", upstreamStatus: response.status, details },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Unable to reach the WhatsApp Cloud API.", error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: "Unable to reach the WhatsApp API." }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
