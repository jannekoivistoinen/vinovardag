import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import TermsPage from "@/components/pages/TermsPage";
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
      ? SITE_CONFIG.i18n.routes.terms.sv
      : SITE_CONFIG.i18n.routes.terms.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const t = await getTranslations({
    locale,
    namespace: "page.terms.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/${SITE_CONFIG.i18n.routes.terms.en}`,
        sv: `${baseUrl}/sv/${SITE_CONFIG.i18n.routes.terms.sv}`,
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
      ? SITE_CONFIG.i18n.routes.terms.sv
      : SITE_CONFIG.i18n.routes.terms.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const homeLabel = locale === "sv" ? "Hem" : "Home";
  const termsLabel = locale === "sv" ? "Villkor" : "Terms";

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `Terms & Conditions | ${SITE_CONFIG.company.name}`,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#organization` },
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
        name: termsLabel,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TermsPage />
    </>
  );
}
