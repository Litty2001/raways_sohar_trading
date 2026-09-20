import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rawayasohar.com"),
  title: "RawayaSolar",
  description:
    "Rawaya Sohar Global is a premier Omani enterprise specializing in multi-sector import, export, distribution, and contracting services across food, construction, and energy sectors.",
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en">
      <head>
        {/* Preserved verbatim from the Angular src/index.html <head>.
            Note: these two font families are loaded by the original site but are not
            currently referenced by any selector in home.scss (which uses `Inter`).
            Kept here for parity with the source of truth. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
