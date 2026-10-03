import type { MetadataRoute } from "next";

const SITE_URL = "https://www.rawayasohar.com";

// Served at /robots.txt. Allows all crawlers, keeps the quote API out of search,
// and points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
