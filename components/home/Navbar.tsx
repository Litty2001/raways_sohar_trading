import Image from "next/image";

const leftNavLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
];

const rightNavLinks = [
  { href: "/about", label: "About Rawaya" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <input id="navToggle" className="nav-toggle" type="checkbox" aria-label="Toggle navigation" />
      <label className="nav-menu-button" htmlFor="navToggle" aria-label="Open navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <div className="nav-menu-panel">
        <ul className="nav-links nav-links-left">
          {leftNavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <ul className="nav-links nav-links-right">
          {rightNavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <a href="/home" className="nav-logo">
        <span className="logo-mark">
          <Image
            src="/assets/rsg-logo.png"
            alt="Rawaya Sohar Global logo"
            width={1254}
            height={1254}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority
          />
        </span>
      </a>
    </nav>
  );
}
