import { HERO_STATS } from "@/lib/site-content";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/1.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-bg"></div>
      <div className="hero-grid-lines"></div>

      <div className="container hero-layout">
        <div className="hero-content">
          <span className="eyebrow">Premier Omani Trading &amp; Contracting Enterprise</span>
          <h1 className="hero-title">
            <span className="hero-title-company">Rawaya Sohar</span>
            <span>Global</span>
          </h1>
          <p className="hero-subtitle">
            A reliable bridge between international supply chains and local market
            demands, delivering import, export, distribution, and contracting services
            from strategic offices in Maabilah, Muscat, and Sohar.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary">
              Explore Divisions
            </a>
            <a href="#contact" className="btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="container hero-stats">
        {HERO_STATS.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-num">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
