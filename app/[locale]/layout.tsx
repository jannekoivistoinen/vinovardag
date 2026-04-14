import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

const haskoy = localFont({
  src: "./../fonts/Haskoy-variable.woff2",
  variable: "--font-haskoy",
});

const cabinetGrotesk = localFont({
  src: "./../fonts/CabinetGrotesk-Medium.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "500",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.company.name} | Premium Wine Experiences in Swedish Lapland`,
  description:
    "Discover exceptional wine tastings and culinary adventures with Vinovardag in Kiruna, Swedish Lapland. Personalized experiences for locals and international travelers.",
  alternates: {
    canonical: SITE_CONFIG.company.url,
  },
  authors: [{ name: SITE_CONFIG.company.name }],
  generator: "Next.js",
  applicationName: SITE_CONFIG.company.name,
  referrer: "origin-when-cross-origin",
  keywords: [
    "wine tastings",
    "sommelier Kiruna",
    "Swedish Lapland",
    "Arctic dining",
    "Nordic wine experiences",
    "culinary experiences",
    "private wine tastings",
    "Kiruna activities",
    "wine tourism Sweden",
    "Vinovardag",
  ],
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
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "EVo6WZtq4f16-mlM784qCHgJz6oFM1LTyfkw8Dm8zuE",
  },
  openGraph: {
    title: `${SITE_CONFIG.company.name} | Premium Wine Experiences in Swedish Lapland`,
    description:
      "Discover exceptional wine tastings and culinary adventures with Vinovardag in Kiruna, Swedish Lapland. Personalized experiences for locals and international travelers.",
    url: SITE_CONFIG.company.url,
    siteName: SITE_CONFIG.company.name,
    images: [
      {
        url: `${SITE_CONFIG.company.url}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Add static params generation
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Type guard for locales
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

  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages();
  } catch {
    notFound();
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.company.name,
    url: SITE_CONFIG.company.url,
    logo: `${SITE_CONFIG.company.url}${SITE_CONFIG.company.logo.default}`,
    email: SITE_CONFIG.company.contact.email,
    telephone: SITE_CONFIG.company.contact.phone,
    sameAs: Object.values(SITE_CONFIG.company.social),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    name: SITE_CONFIG.company.name,
    url: SITE_CONFIG.company.url,
    description: SITE_CONFIG.company.description,
    image: `${SITE_CONFIG.company.url}/og-image.jpg`,
    priceRange: "SEK 1195-2500",
    openingHours: "By appointment",
    servesCuisine: ["Nordic", "Arctic", "Swedish"],
    areaServed: "Kiruna, Swedish Lapland",
    currenciesAccepted: "SEK",
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Hjalmar+Lundbohmsv%C3%A4gen+74A,+98139+Kiruna,+Sweden",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 67.8558,
      longitude: 20.2253,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hjalmar Lundbohmsvagen 74A",
      postalCode: "98139",
      addressLocality: "Kiruna",
      addressCountry: "SE",
    },
    email: SITE_CONFIG.company.contact.email,
    telephone: SITE_CONFIG.company.contact.phone,
  };

  return (
    <html
      lang={locale}
      className={`${haskoy.variable} ${cabinetGrotesk.variable}`}
    >
      <head>
        <script
          defer
          data-domain="vinovardag.se"
          src="https://plausible.io/js/script.js"
        ></script>
        <JsonLd data={organizationSchema} />
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
      </body>
    </html>
  );
}
