import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rawayasohar.com"),
  title: "Rawaya Sohar Global",
  description:
    "Rawaya Sohar Global is a premier Omani enterprise specializing in multi-sector import, export, distribution, and contracting services across food, construction, and energy sectors.",
  icons: {
    icon: "/assets/rsg-logo.png",
    apple: "/assets/rsg-logo.png",
  },
  openGraph: {
    title: "Rawaya Sohar Global",
    description:
      "A reliable bridge between international supply chains and local market demands, delivering import, export, distribution, and contracting services from strategic offices in Maabilah, Muscat, and Sohar.",
    url: "https://www.rawayasohar.com/home",
    siteName: "Rawaya Sohar Global",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
