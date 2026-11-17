import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations("page.terms");

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24 page-hero">
          <MarkdownText className="text-brand-dark mb-3 md:mb-6">
            {t("hero.title")}
          </MarkdownText>
          <MarkdownText className="p-lg content">
            {t("hero.description")}
          </MarkdownText>
        </div>
      </section>

      <section id="terms" className="container content">
        <div className="md:mx-auto md:text-center max-w-4xl">
          <MarkdownText className="text-brand-dark mb-6">
            {t("terms.title")}
          </MarkdownText>
          <MarkdownText className="mb-12 p-lg">
            {t("terms.description")}
          </MarkdownText>
        </div>
      </section>
      <FAQ />
    </>
  );
}
