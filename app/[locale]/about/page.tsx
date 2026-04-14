import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import AboutPage from "@/components/pages/AboutPage";
import JsonLd from "@/components/JsonLd";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = COMPANY_METADATA.url.endsWith("/")
    ? COMPANY_METADATA.url.slice(0, -1)
    : COMPANY_METADATA.url;
  const localizedPath =
    locale === "sv"
      ? SITE_CONFIG.i18n.routes.about.sv
      : SITE_CONFIG.i18n.routes.about.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const t = await getTranslations({
    locale,
    namespace: "page.about.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/${SITE_CONFIG.i18n.routes.about.en}`,
        sv: `${baseUrl}/sv/${SITE_CONFIG.i18n.routes.about.sv}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: COMPANY_METADATA.name,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

// Update Page component to handle Promise params
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const baseUrl = COMPANY_METADATA.url.endsWith("/")
    ? COMPANY_METADATA.url.slice(0, -1)
    : COMPANY_METADATA.url;
  const localizedPath =
    locale === "sv" ? SITE_CONFIG.i18n.routes.about.sv : SITE_CONFIG.i18n.routes.about.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const aboutTranslations = await getTranslations({
    locale,
    namespace: "page.about.hannaProfile",
  });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hanna Karkea",
    jobTitle: aboutTranslations("subtitle"),
    description: aboutTranslations("bio"),
    url: canonicalUrl,
    image: `${baseUrl}/assets/images/vinovardag-hanna-karkea.jpg`,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Scandinavian Wine Academy",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "WSET Level 3",
    },
    knowsAbout: [
      "wine",
      "sommelier",
      "Nordic cuisine",
      "Arctic food culture",
      "wine pairings",
    ],
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.company.name,
      url: SITE_CONFIG.company.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hjalmar Lundbohmsvägen 74A",
        postalCode: "98139",
        addressLocality: "Kiruna",
        addressCountry: "SE",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kiruna",
      addressCountry: "SE",
    },
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <AboutPage locale={locale} />
    </>
  );
}
