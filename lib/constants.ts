import { IconKey } from "@/app/assets/images";

// Site Configuration - Edit this object to customize the template for different websites
export const SITE_CONFIG = {
  // Company/Organization Information
  company: {
    name: "Vinovardag",
    domain: "vinovardag.se",
    url: "https://vinovardag.se",
    description:
      "Provide top-notch website design and development services tailored to meet your business needs. Team of experts ensures your online presence is both visually appealing and highly functional.",
    sitemapUrl: "https://vinovardag.se/sitemap.xml",
    logo: {
      // Path to logo images
      default: "/logo.svg",
      dark: "/logo-dark.svg",
      alt: "Company Logo",
    },
    contact: {
      email: "info@vinovardag.se",
      phone: "+46707123456",
      address: "123 Main Street, City, Country",
    },
    social: {
      facebook: "https://facebook.com/example",
      twitter: "https://twitter.com/example",
      instagram: "https://instagram.com/example",
      linkedin: "https://linkedin.com/company/example",
    },
  },

  // Internationalization Settings
  i18n: {
    locales: ["sv", "en"] as const,
    defaultLocale: "en" as const,
    // Add locale-specific routes here if needed
    routes: {
      services: {
        en: "services",
        sv: "services-sv",
      },
      about: {
        en: "about",
        sv: "about-sv",
      },
      contact: {
        en: "contact",
        sv: "kontakt",
      },
      terms: {
        en: "terms",
        sv: "terms-sv",
      },
    },
    // Language switcher visibility settings
    languageSwitcher: {
      showOnDesktop: true,
      showOnMobile: true,
    },
  },

  // Theme Configuration
  theme: {
    colors: {
      primary: "#A77E16",
      secondary: "#000000",
      accent: "#D3A01C",
    },
    fonts: {
      heading: "Cabinet Grotesk, sans-serif",
      body: "Haskoy, sans-serif",
    },
  },
};

export const COMPANY_METADATA = SITE_CONFIG.company;
export const locales = SITE_CONFIG.i18n.locales;
export const defaultLocale = SITE_CONFIG.i18n.defaultLocale;

export type NavigationItem = {
  link: string;
  en: { name: string; href: string; description?: string };
  sv: { name: string; href: string; description?: string };
  sublinks?: Array<{
    link: string;
    icon?: IconKey;
    en: { name: string; href: string; description?: string };
    sv: { name: string; href: string; description?: string };
  }>;
};

export const NAVIGATION_LINKS: NavigationItem[] = [
  {
    link: "welcome",
    en: {
      name: "Welcome",
      href: `/en`,
    },
    sv: {
      name: "Välkommen",
      href: `/sv`,
    },
  },
  {
    link: "services",
    en: {
      name: "Services",
      href: `/en/${SITE_CONFIG.i18n.routes.services.en}`,
    },
    sv: {
      name: "Tjänster",
      href: `/sv/${SITE_CONFIG.i18n.routes.services.sv}`,
    },
  },
  {
    link: "about",
    en: {
      name: "About",
      href: `/en/${SITE_CONFIG.i18n.routes.about.en}`,
    },
    sv: {
      name: "Om oss",
      href: `/sv/${SITE_CONFIG.i18n.routes.about.sv}`,
    },
  },
  {
    link: "contact",
    en: {
      name: "Contact",
      href: `/en/${SITE_CONFIG.i18n.routes.contact.en}`,
    },
    sv: {
      name: "Kontakt",
      href: `/sv/${SITE_CONFIG.i18n.routes.contact.sv}`,
    },
  },
];

export const NAVIGATION_CTA: NavigationItem[] = [
  {
    link: "cta",
    en: {
      name: "Get in touch",
      href: `/en/${SITE_CONFIG.i18n.routes.contact.en}`,
    },
    sv: {
      name: "Kontakta oss",
      href: `/sv/${SITE_CONFIG.i18n.routes.contact.sv}`,
    },
  },
];
