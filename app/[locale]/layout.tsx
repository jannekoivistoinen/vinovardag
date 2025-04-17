import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { Source_Serif_4 } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const basteleurGrotesk = localFont({
  src: "./../fonts/Basteleur-Moonlight.woff2",
  variable: "--font-basteleur",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.company.name} | Experience unique accommodation & activities in Finnish Lapland`,
  description:
    "Discover authentic stays and unforgettable adventures at Lucky Ranch, a family owned experience ranch based in Pyhätunturi, close to Rovaniemi.",
  alternates: {
    canonical: SITE_CONFIG.company.url,
  },
  authors: [{ name: SITE_CONFIG.company.name }],
  generator: "Next.js",
  applicationName: SITE_CONFIG.company.name,
  referrer: "origin-when-cross-origin",
  keywords: [
    "family owned experience ranch",
    "pyhätunturi",
    "rovaniemi",
    "finnish lapland",
    "accommodation",
    "activities",
    "snow igloos",
    "horses",
    "sauna",
    "ice swimming",
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
    title: `${SITE_CONFIG.company.name} | Experience unique accommodation & activities in Finnish Lapland`,
    description:
      "Discover authentic stays and unforgettable adventures at Lucky Ranch, a family owned experience ranch based in Pyhätunturi, close to Rovaniemi.",
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

  return (
    <html
      lang={locale}
      className={`${sourceSerif.variable} ${basteleurGrotesk.variable}`}
    >
      <head>
        <script
          defer
          data-domain="luckyranch.fi"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
