import { execSync } from "node:child_process";
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

const ROUTE_SOURCES: Record<string, string[]> = {
  "": ["app/[locale]/page.tsx", "components/pages/HomePage.tsx"],
  "/services": [
    "app/[locale]/services/page.tsx",
    "components/pages/ServicesPage.tsx",
  ],
  "/about": [
    "app/[locale]/about/page.tsx",
    "components/pages/AboutPage.tsx",
  ],
  "/contact": [
    "app/[locale]/contact/page.tsx",
    "components/pages/ContactPage.tsx",
  ],
  "/terms": [
    "app/[locale]/terms/page.tsx",
    "components/pages/TermsPage.tsx",
  ],
};

function getLastMod(files: string[]): string | undefined {
  try {
    const iso = execSync(
      `git log -1 --format=%cI -- ${files.map((f) => `"${f}"`).join(" ")}`,
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    return iso || undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = COMPANY_METADATA;
  const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  const pathnames = routing.pathnames as Pathnames;
  const paths = Object.keys(pathnames);

  const homeLastMod = getLastMod(ROUTE_SOURCES[""]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: homeLastMod,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sv: `${baseUrl}/sv`,
          "x-default": `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/sv`,
      lastModified: homeLastMod,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          sv: `${baseUrl}/sv`,
          "x-default": `${baseUrl}/en`,
        },
      },
    },
  ];

  paths.forEach((path) => {
    const englishUrl = `${baseUrl}/en${pathnames[path].en}`;
    const swedishUrl = `${baseUrl}/sv${pathnames[path].sv}`;
    const lastModified = ROUTE_SOURCES[path]
      ? getLastMod(ROUTE_SOURCES[path])
      : undefined;

    entries.push({
      url: englishUrl,
      lastModified,
      alternates: {
        languages: {
          en: englishUrl,
          sv: swedishUrl,
          "x-default": englishUrl,
        },
      },
    });

    entries.push({
      url: swedishUrl,
      lastModified,
      alternates: {
        languages: {
          en: englishUrl,
          sv: swedishUrl,
          "x-default": englishUrl,
        },
      },
    });
  });

  return entries;
}
