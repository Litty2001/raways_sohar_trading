import type { MetadataRoute } from "next";

const SITE_URL = "https://www.rawayasohar.com";

// Served at /sitemap.xml. "/" is omitted because it only redirects to /home.
const PAGES: { path: string; priority: number }[] = [
  { path: "/home", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/gallery", priority: 0.6 },
  { path: "/careers", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
