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
  const baseUrl = COMPANY_METADATA.url.endsWith("/")
    ? COMPANY_METADATA.url.slice(0, -1)
    : COMPANY_METADATA.url;
  const localizedPath =
    locale === "sv"
      ? SITE_CONFIG.i18n.routes.services.sv
      : SITE_CONFIG.i18n.routes.services.en;
  const canonicalUrl = `${baseUrl}/${locale}/${localizedPath}`;
  const homeLabel = locale === "sv" ? "Hem" : "Home";
  const servicesLabel = locale === "sv" ? "Tjänster" : "Services";

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

  const cleanTitle = (t: string) =>
    t.replace(/^###\s*\*?\s*/, "").replace(/\*/g, "").trim();

  const areaServedNode = {
    "@type": "City",
    name: "Kiruna",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Swedish Lapland",
    },
  } as const;

  const serviceItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#services`,
    itemListElement: allServices.map((service, index) => {
      const name = cleanTitle(service.title);
      const serviceNode: Record<string, unknown> = {
        "@type": ["Service", "TouristTrip"],
        name,
        description: service.description,
        image: service.imageKey
          ? `${baseUrl}/assets/images/${service.imageKey}.jpg`
          : `${baseUrl}/og-image.jpg`,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: areaServedNode,
        offers: {
          "@type": "Offer",
          priceCurrency: "SEK",
          priceRange: "SEK 1195-2500",
          availability: "https://schema.org/InStock",
          url: service.bookingUrl ?? canonicalUrl,
          seller: { "@id": `${baseUrl}/#organization` },
        },
      };
      if (service.bookingUrl) {
        serviceNode.url = service.bookingUrl;
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        item: serviceNode,
      };
    }),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CollectionPage"],
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${SITE_CONFIG.company.name} Services`,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#organization` },
    mainEntity: { "@id": `${canonicalUrl}#services` },
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
        name: servicesLabel,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceItemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ServicesPage locale={locale} />
    </>
  );
}
