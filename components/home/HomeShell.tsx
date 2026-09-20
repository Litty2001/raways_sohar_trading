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

    const scrollListener = () => {
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

    window.addEventListener("scroll", scrollListener);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealTargets = host.querySelectorAll<HTMLElement>(
      ".pillar, .service-item, .why-item, .product-card"
    );

    revealTargets.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });

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
