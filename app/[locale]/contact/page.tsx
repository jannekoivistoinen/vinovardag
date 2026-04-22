import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import ContactPage from "@/components/pages/ContactPage";
import JsonLd from "@/components/JsonLd";

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
      ? SITE_CONFIG.i18n.routes.contact.sv
      : SITE_CONFIG.i18n.routes.contact.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const t = await getTranslations({
    locale,
    namespace: "page.contact.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/${SITE_CONFIG.i18n.routes.contact.en}`,
        sv: `${baseUrl}/sv/${SITE_CONFIG.i18n.routes.contact.sv}`,
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
    locale === "sv"
      ? SITE_CONFIG.i18n.routes.contact.sv
      : SITE_CONFIG.i18n.routes.contact.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const homeLabel = locale === "sv" ? "Hem" : "Home";
  const contactLabel = locale === "sv" ? "Kontakt" : "Contact";

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "ContactPage"],
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `Contact ${SITE_CONFIG.company.name}`,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#organization` },
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE_CONFIG.company.contact.email,
      availableLanguage: ["English", "Swedish", "Finnish"],
      areaServed: "SE",
    },
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
        name: contactLabel,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ContactPage />
    </>
  );
}
