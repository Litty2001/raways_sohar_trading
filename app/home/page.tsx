import type { Metadata } from "next";
import HomeShell from "@/components/home/HomeShell";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Rawaya Sohar Global | Trading, Contracting & Supply",
  description:
    "Rawaya Sohar Global is an Omani trading and contracting enterprise connecting international supply chains with local markets through import, export, distribution, industrial supply and contracting services.",
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    title: "Rawaya Sohar Global | Trading & Contracting",
    description:
      "A reliable bridge between international supply chains and local market demands, delivering import, export, distribution, and contracting services from strategic offices in Maabilah, Muscat, and Sohar.",
    url: "/home",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <HomeShell>
      <Navbar />
      <Hero />
      <WhyUs />
      <Footer />
    </HomeShell>
  );
}
