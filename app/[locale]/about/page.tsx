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
  const homeLabel = locale === "sv" ? "Hem" : "Home";
  const aboutLabel = locale === "sv" ? "Om oss" : "About";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#hanna-karkea`,
    name: "Hanna Karkea",
    jobTitle: "Sommelier",
    description: aboutTranslations("bio"),
    url: canonicalUrl,
    image: `${baseUrl}/assets/images/vinovardag-hanna-karkea.jpg`,
    nationality: { "@type": "Country", name: "Finland" },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Scandinavian Wine Academy",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "WSET Level 3",
        credentialCategory: "certification",
        recognizedBy: {
          "@type": "Organization",
          name: "Wine & Spirit Education Trust",
          url: "https://www.wsetglobal.com/",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Certified Sommelier",
        credentialCategory: "certification",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "Scandinavian Wine Academy",
        },
      },
    ],
    knowsLanguage: ["en", "sv", "fi"],
    knowsAbout: [
      "wine",
      "sommelier",
      "Nordic cuisine",
      "Arctic food culture",
      "wine pairings",
      "cool-climate viticulture",
    ],
    worksFor: { "@id": `${baseUrl}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kiruna",
      addressRegion: "Norrbotten",
      addressCountry: "SE",
    },
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "AboutPage"],
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `About ${SITE_CONFIG.company.name}`,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#organization` },
    mainEntity: { "@id": `${baseUrl}/#hanna-karkea` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: aboutLabel,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AboutPage locale={locale} />
    </>
  );
}
