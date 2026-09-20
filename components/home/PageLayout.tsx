import type { ReactNode } from "react";
import Footer from "./Footer";
import HomeShell from "./HomeShell";
import Navbar from "./Navbar";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <HomeShell>
      <Navbar />
      {children}
      <Footer />
    </HomeShell>
  );
}
