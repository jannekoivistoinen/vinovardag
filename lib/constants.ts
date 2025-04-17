import { IconKey } from "@/app/assets/images";

// Site Configuration - Edit this object to customize the template for different websites
export const SITE_CONFIG = {
  // Company/Organization Information
  company: {
    name: "Lucky Ranch",
    domain: "luckyranch.fi",
    url: "https://luckyranch.fi",
    description:
      "Provide top-notch website design and development services tailored to meet your business needs. Team of experts ensures your online presence is both visually appealing and highly functional.",
    sitemapUrl: "https://luckyranch.fi/sitemap.xml",
    logo: {
      // Path to logo images
      default: "/logo.svg",
      dark: "/logo-dark.svg",
      alt: "Company Logo",
    },
    contact: {
      email: "info@example.com",
      phone: "+1234567890",
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
    locales: ["fi", "en"] as const,
    defaultLocale: "fi" as const,
    // Add locale-specific routes here if needed
    routes: {
      subpage: {
        en: "subpage",
        fi: "alasivu",
      },
      contact: {
        en: "contact",
        fi: "yhteystiedot",
      },
    },
    // Language switcher visibility settings
    languageSwitcher: {
      showOnDesktop: false,
      showOnMobile: false,
    },
  },

  // Theme Configuration
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      accent: "#f59e0b",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },
};

export const COMPANY_METADATA = SITE_CONFIG.company;
export const locales = SITE_CONFIG.i18n.locales;
export const defaultLocale = SITE_CONFIG.i18n.defaultLocale;

export type NavigationItem = {
  link: string;
  en: { name: string; href: string; description?: string };
  fi: { name: string; href: string; description?: string };
  sublinks?: Array<{
    link: string;
    icon?: IconKey;
    en: { name: string; href: string; description?: string };
    fi: { name: string; href: string; description?: string };
  }>;
};

export const NAVIGATION_LINKS: NavigationItem[] = [
  {
    link: "activities",
    en: {
      name: "Subpage",
      href: `/en/${SITE_CONFIG.i18n.routes.subpage.en}`,
    },
    fi: {
      name: "Alasivu",
      href: `/fi/${SITE_CONFIG.i18n.routes.subpage.fi}`,
    },
  },
];

export const NAVIGATION_CTA: NavigationItem[] = [
  {
    link: "cta",
    en: {
      name: "Contact",
      href: `/en/info/${SITE_CONFIG.i18n.routes.contact.en}`,
    },
    fi: {
      name: "Yhteystiedot",
      href: `/fi/info/${SITE_CONFIG.i18n.routes.contact.fi}`,
    },
  },
];
