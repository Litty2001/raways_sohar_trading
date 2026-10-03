"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./home.scss";

// Thin client-side wrapper around the (mostly server-rendered) section components.
// It exists only to own the two effects that need the DOM/browser: the scroll-spy nav
// highlight and the IntersectionObserver reveal animation. Everything it renders is
// passed in as `children` from the Server Component page (app/home/page.tsx), so the
// Navbar/Hero/About/etc. sections stay Server Components and ship zero extra client JS.
//
// Ported from Angular's Home component (home.ts, ngAfterViewInit/ngOnDestroy).
// Angular guarded this with `isPlatformBrowser` since the app is server-rendered;
// here that's unnecessary because effects only ever run on the client in React.
export default function HomeShell({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const sections = host.querySelectorAll<HTMLElement>("section[id]");
    const links = host.querySelectorAll<HTMLElement>(".nav-links a");
    const navigation = host.querySelector<HTMLElement>(".site-nav");

    const scrollListener = () => {
      navigation?.classList.toggle("is-scrolled", window.scrollY > 24);
      let current = "";

      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.id;
        }
      });

      links.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${current}`) {
          link.style.color = "var(--blue)";
        }
      });
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    scrollListener();

    // Scroll reveal: elements fade/slide in once as they enter the viewport. Siblings are
    // staggered so rows of cards cascade. Skipped entirely for reduced-motion users, and
    // the hero is excluded because it has its own load-in animation in home.scss.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    if (!prefersReducedMotion) {
      const revealTargets = host.querySelectorAll<HTMLElement>(
        [
          ".section-tag", ".section-title", ".why-title", ".contact-info-title",
          ".about-text > p", ".why-desc", ".contact-info-desc", ".gallery-intro p", ".services-intro p",
          ".careers-copy", ".gold-divider", ".about-photo", ".contact-form-wrap", ".contact-detail",
          ".pillar", ".product-card", ".service-item", ".why-item", ".gallery-image",
          ".footer-grid > *",
        ].join(", ")
      );

      revealTargets.forEach((element) => {
        if (element.closest(".hero-section")) return;
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const index = Math.min(Math.max(siblings.indexOf(element), 0), 5);
        element.style.setProperty("--reveal-delay", `${index * 90}ms`);
        element.classList.add("reveal");
        observer.observe(element);
      });
    }

    return () => {
      window.removeEventListener("scroll", scrollListener);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-page" ref={hostRef}>
      {children}
    </div>
  );
}
