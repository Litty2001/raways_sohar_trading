"use client";

import { useState } from "react";
import { SERVICE_INTEREST_OPTIONS } from "@/lib/site-content";

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  interest: string;
  message: string;
}

type SubmissionStatus = "idle" | "sending" | "success" | "error";

const INITIAL_STATE: FormState = {
  firstName: "", lastName: "", company: "", email: "", interest: "", message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const sending = status === "sending";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setForm((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Quote request failed");

      setForm(INITIAL_STATE);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form-wrap" onSubmit={handleSubmit}>
      <h3 className="form-title">Request a Quote</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} required disabled={sending} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} required disabled={sending} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">Company / Project</label>
        <input id="company" type="text" placeholder="Company or project name" value={form.company} onChange={handleChange} disabled={sending} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required disabled={sending} />
      </div>
      <div className="form-group">
        <label htmlFor="interest">Service Interest</label>
        <select id="interest" value={form.interest} onChange={handleChange} required disabled={sending}>
          {SERVICE_INTEREST_OPTIONS.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Tell us about your requirement..." value={form.message} onChange={handleChange} required disabled={sending} />
      </div>
      <button type="submit" className="form-submit" disabled={sending}>{sending ? "Sending..." : "Send Request"}</button>
      {status === "success" && <p className="form-status form-status-success" role="status">Request submitted successfully. We will contact you shortly.</p>}
      {status === "error" && <p className="form-status form-status-error" role="alert">We couldn&apos;t submit your request right now. Please try again.</p>}
    </form>
  );
}
