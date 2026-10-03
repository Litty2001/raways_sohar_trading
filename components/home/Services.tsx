import { SERVICES } from "@/lib/site-content";

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-intro">
          <div>
            <span className="section-tag">Services</span>
            <h2 className="section-title">
              End-to-end commercial solutions across food, construction, and energy.
            </h2>
          </div>
          <p>
            We optimize supply chains through our hubs in Maabilah and Sohar, supporting
            Oman&apos;s economic diversification while building long-term, trust-based
            partnerships with our clients.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((service) => (
            <article className="service-item" id={service.id} key={service.id}>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
