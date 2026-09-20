import { FOOTER_LINK_GROUPS } from "@/lib/site-content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">Rawaya Sohar Global</span>
            <p className="footer-tagline">
              A premier Omani enterprise providing multi-sector import, export,
              distribution, logistics, import-export, and contracting services across food,
              construction, and energy sectors.
            </p>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="footer-col-title">{group.title}</div>
              <ul className="footer-links">
                {group.links.map((link, index) => (
                  <li key={`${group.title}-${link.label}-${index}`}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">Copyright 2026 Rawaya Sohar Global. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
