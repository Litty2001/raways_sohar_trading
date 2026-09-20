import Image from "next/image";
import { ABOUT_PILLARS } from "@/lib/site-content";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="visual-photo about-photo">
            <Image
              src="/assets/19.png"
              alt="Trade and contracting operations supporting regional business growth"
              width={1024}
              height={1536}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="about-text">
          <span className="section-tag">About Company</span>
          <h2 className="section-title">
            A reliable bridge between international supply chains and local market demands.
          </h2>
          <div className="gold-divider"></div>
          <p>
            Rawaya Sohar Global is a premier Omani enterprise specializing in multi-sector
            import, export, distribution, and contracting services. Headquartered in Oman
            with strategic offices in Maabilah, Muscat, and Sohar, we connect international
            supply chains with local market demands.
          </p>
          <p>
            We deliver end-to-end commercial solutions across essential foodstuffs,
            high-grade building materials, heavy construction equipment, and energy
            solutions ranging from robust power generators to modern solar panel systems.
            Our dual hubs in Muscat and Sohar support fast distribution, dependable
            procurement, and seamless trade execution across the Sultanate and beyond.
          </p>

          <div className="about-pillars">
            {ABOUT_PILLARS.map((pillar) => (
              <div className="pillar" key={pillar.title}>
                <div className="pillar-title">{pillar.title}</div>
                <div className="pillar-desc">{pillar.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
