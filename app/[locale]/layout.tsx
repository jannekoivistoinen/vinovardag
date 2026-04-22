import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { SITE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

const haskoy = localFont({
  src: "./../fonts/Haskoy-variable.woff2",
  variable: "--font-haskoy",
});

const cabinetGrotesk = localFont({
  src: "./../fonts/CabinetGrotesk-Medium.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "500",
});

const BASE_URL = SITE_CONFIG.company.url.endsWith("/")
  ? SITE_CONFIG.company.url.slice(0, -1)
  : SITE_CONFIG.company.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.homepage.metadata",
  });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | ${SITE_CONFIG.company.name}`,
    },
    description: t("description"),
    applicationName: SITE_CONFIG.company.name,
    authors: [{ name: SITE_CONFIG.company.name, url: BASE_URL }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
    verification: {
      google: "EVo6WZtq4f16-mlM784qCHgJz6oFM1LTyfkw8Dm8zuE",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        sv: `${BASE_URL}/sv`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
      siteName: SITE_CONFIG.company.name,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      alternateLocale: locale === "sv" ? ["en_US"] : ["sv_SE"],
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.company.name} — sommelier-led wine and culinary experiences in Kiruna, Swedish Lapland`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/og-image.jpg`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function isValidLocale(
  locale: string
): locale is (typeof routing.locales)[number] {
  return routing.locales.includes(locale as (typeof routing.locales)[number]);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  setRequestLocale(locale);

  let messages;
  let tTestimonials;
  try {
    [messages, tTestimonials] = await Promise.all([
      getMessages(),
      getTranslations({
        locale,
        namespace: "component.testimonials",
      }),
    ]);
  } catch {
    notFound();
  }
  const testimonialItems = tTestimonials.raw("items") as Array<{
    name: string;
    quote: string;
  }>;

  const reviews = testimonialItems.map((item) => {
    const cleanedAuthor = item.name
      .replace(/\*\*/g, "")
      .split(" - ")[0]
      .trim();
    return {
      "@type": "Review",
      author: { "@type": "Person", name: cleanedAuthor },
      reviewBody: item.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    };
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_CONFIG.company.name,
    alternateName: "Vinovårdag",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    image: `${BASE_URL}/og-image.jpg`,
    description: SITE_CONFIG.company.description,
    email: SITE_CONFIG.company.contact.email,
    slogan: "Premium wine and culinary experiences in Swedish Lapland",
    foundingLocation: {
      "@type": "Place",
      name: "Kiruna, Swedish Lapland",
    },
    founder: {
      "@type": "Person",
      name: "Hanna Karkea",
      jobTitle: "Sommelier",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Scandinavian Wine Academy",
      },
    },
    knowsAbout: [
      "wine",
      "sommelier",
      "Nordic cuisine",
      "Arctic food culture",
      "wine pairings",
      "cool-climate viticulture",
      "Swedish Lapland",
    ],
    sameAs: Object.values(SITE_CONFIG.company.social),
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_CONFIG.company.name,
    alternateName: "Vinovårdag",
    description: SITE_CONFIG.company.description,
    inLanguage: ["en", "sv"],
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    "@id": `${BASE_URL}/#localbusiness`,
    name: SITE_CONFIG.company.name,
    url: BASE_URL,
    description: SITE_CONFIG.company.description,
    image: [
      `${BASE_URL}/og-image.jpg`,
      `${BASE_URL}/logo.png`,
    ],
    logo: `${BASE_URL}/logo.svg`,
    priceRange: "SEK 1195-2500",
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "By appointment",
    },
    servesCuisine: ["Nordic", "Arctic", "Swedish"],
    areaServed: {
      "@type": "City",
      name: "Kiruna",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Swedish Lapland",
      },
    },
    currenciesAccepted: "SEK",
    paymentAccepted: ["Cash", "Credit Card", "Invoice"],
    knowsLanguage: ["en", "sv", "fi"],
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Hjalmar+Lundbohmsv%C3%A4gen+74A,+98139+Kiruna,+Sweden",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 67.8558,
      longitude: 20.2253,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hjalmar Lundbohmsvägen 74A",
      postalCode: "98139",
      addressLocality: "Kiruna",
      addressRegion: "Norrbotten",
      addressCountry: "SE",
    },
    email: SITE_CONFIG.company.contact.email,
    founder: { "@id": `${BASE_URL}/#organization` },
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "5",
      reviewCount: reviews.length,
    },
    review: reviews,
  };

  return (
    <html
      lang={locale}
      className={`${haskoy.variable} ${cabinetGrotesk.variable}`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Navigation />
            <main className="flex-grow overflow-x-clip">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-7RT7TFK6GX" />
      </body>
    </html>
  );
}
