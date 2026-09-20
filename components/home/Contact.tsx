import { CONTACT_DETAILS } from "@/lib/site-content";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-grid">
        <div>
          <span className="section-tag">Contact</span>
          <h2 className="contact-info-title">Build Your Next Partnership With Us</h2>
          <p className="contact-info-desc">
            Contact Rawaya Sohar Global for foodstuff import and distribution, building
            materials, construction machinery, generators, air compressors, diesel fuel,
            logistics, import-export, and contracting services.
          </p>
          <div className="contact-details">
            {CONTACT_DETAILS.map((detail) => (
              <div className="contact-detail" key={detail.label}>
                <span className="contact-detail-icon">{detail.icon}</span>
                <div>
                  <div className="contact-detail-label">{detail.label}</div>
                  <div className="contact-detail-value">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
