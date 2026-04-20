import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import ServicesPage from "@/components/pages/ServicesPage";
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
      ? SITE_CONFIG.i18n.routes.services.sv
      : SITE_CONFIG.i18n.routes.services.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const t = await getTranslations({
    locale,
    namespace: "page.services.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/${SITE_CONFIG.i18n.routes.services.en}`,
        sv: `${baseUrl}/sv/${SITE_CONFIG.i18n.routes.services.sv}`,
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
  const servicesTranslations = await getTranslations({
    locale,
    namespace: "page.services.services",
  });
  const sharedServices = servicesTranslations.raw("service") as Array<{
    title: string;
    description?: string;
    imageKey?: string;
    bookingUrl?: string;
  }>;
  const privateServicesSection = servicesTranslations.raw(
    "privateServices"
  ) as {
    service: Array<{
      title: string;
      description?: string;
      imageKey?: string;
      bookingUrl?: string;
    }>;
  };
  const allServices = [...sharedServices, ...privateServicesSection.service];

  const serviceItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title.replace(/^###\s*\*?\s*/, ""),
        description: service.description,
        image: service.imageKey
          ? `${SITE_CONFIG.company.url}/assets/images/${service.imageKey}.jpg`
          : undefined,
        url: service.bookingUrl,
        provider: {
          "@type": "Organization",
          name: SITE_CONFIG.company.name,
          url: SITE_CONFIG.company.url,
        },
        areaServed: "Kiruna, Swedish Lapland",
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceItemListSchema} />
      <ServicesPage locale={locale} />
    </>
  );
}
