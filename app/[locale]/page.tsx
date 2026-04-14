import { Metadata } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import HomePage from "@/components/pages/HomePage";
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
  const canonicalUrl = `${baseUrl}/${locale}`;
  const t = await getTranslations({
    locale,
    namespace: "page.homepage.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en`,
        sv: `${baseUrl}/sv`,
        "x-default": `${baseUrl}/en`,
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
  const faqTranslations = await getTranslations({
    locale,
    namespace: "component.faq",
  });
  const faqItems = faqTranslations.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question.replace(/^\*\s*/, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomePage locale={locale} />
    </>
  );
}
