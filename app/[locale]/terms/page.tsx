import { Metadata } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import TermsPage from "@/components/pages/TermsPage";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.terms.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: COMPANY_METADATA.url,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: COMPANY_METADATA.url,
      siteName: COMPANY_METADATA.name,
      images: [
        {
          url: `${COMPANY_METADATA.url}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// Update Page component to handle Promise params
export default async function Page({ params }: Props) {
  await params; // Ensure params are resolved
  return <TermsPage />;
}
