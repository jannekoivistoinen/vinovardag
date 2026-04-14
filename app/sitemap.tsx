import type { MetadataRoute } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { routing } from "@/i18n/routing";

type PathConfig = {
  en: string;
  sv: string;
};

type Pathnames = {
  [key: string]: PathConfig;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = COMPANY_METADATA;
  const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  // Get all unique pathnames from the routing configuration
  const pathnames = routing.pathnames as Pathnames;
  const paths = Object.keys(pathnames);

  // Create sitemap entries for each path and both languages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for Swedish paths
  paths.forEach((path) => {
    const swedishUrl = `${baseUrl}/sv${pathnames[path].sv}`;
    const englishUrl = `${baseUrl}/en${pathnames[path].en}`;

    sitemapEntries.push({
      url: swedishUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          en: englishUrl,
          sv: swedishUrl,
        },
      },
    });
  });

  // Add entries for English paths
  paths.forEach((path) => {
    const englishUrl = `${baseUrl}/en${pathnames[path].en}`;
    const swedishUrl = `${baseUrl}/sv${pathnames[path].sv}`;

    sitemapEntries.push({
      url: englishUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          en: englishUrl,
          sv: swedishUrl,
        },
      },
    });
  });

  // Add homepage entry and locale-specific homepages
  const homepageEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sv: `${baseUrl}/sv`,
        },
      },
    },
    {
      url: `${baseUrl}/sv`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sv: `${baseUrl}/sv`,
        },
      },
    },
  ];

  return [...homepageEntries, ...sitemapEntries];
}
