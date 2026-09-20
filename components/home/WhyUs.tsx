import { WHY_ITEMS } from "@/lib/site-content";

export default function WhyUs() {
  return (
    <section id="why" className="why-section">
      <div className="container why-grid">
        <div>
          <span className="section-tag">Vision &amp; Mission</span>
          <h2 className="why-title">Driving sustainable growth through reliable trade networks.</h2>
          <p className="why-desc">
            Rawaya Sohar Global is focused on regional leadership, renewable energy
            adoption, and dependable supply networks that support infrastructure and
            economic diversification.
          </p>
        </div>

        <div className="why-items">
          {WHY_ITEMS.map((item) => (
            <article className="why-item" key={item.title}>
              <div>
                <h3 className="why-item-title">{item.title}</h3>
                <p className="why-item-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
