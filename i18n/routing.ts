import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { SITE_CONFIG } from "@/lib/constants";

// Create a dynamic pathnames object based on the routes in SITE_CONFIG
const generatePathnames = () => {
  const pathnames: Record<string, Record<string, string>> = {};

  // Add each route from the SITE_CONFIG
  Object.entries(SITE_CONFIG.i18n.routes).forEach(([key, localeValues]) => {
    const path = `/${localeValues.en}`; // Use English as the base path
    pathnames[path] = {};

    // Add each locale's path
    SITE_CONFIG.i18n.locales.forEach((locale) => {
      const localePath = localeValues[locale as keyof typeof localeValues];
      pathnames[path][locale] = `/${localePath}`;
    });
  });

  return pathnames;
};

export const routing = defineRouting({
  locales: SITE_CONFIG.i18n.locales,
  defaultLocale: SITE_CONFIG.i18n.defaultLocale,
  pathnames: generatePathnames(),
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
