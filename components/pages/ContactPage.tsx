import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactForm from "../ContactForm";
export default async function ContactPage() {
  const t = await getTranslations("page.contact");

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24 page-hero">
          <MarkdownText className="mb-3 md:mb-6">
            {t("hero.title")}
          </MarkdownText>
          <MarkdownText className="p-lg content max-w-3xl mx-auto">
            {t("hero.description")}
          </MarkdownText>
          <Button
            size="lg"
            className="mx-auto mt-8 !text-white hover:no-underline"
            asChild
          >
            <Link href="#form" className="hover:no-underline" target="_blank">
              {t("hero.buttonText")}
            </Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          <div>
            <MarkdownText className="mb-3 md:mb-6">
              {t("contact.title")}
            </MarkdownText>
            <div className="mb-3 md:mb-6 w-full aspect-video rounded overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Hjalmar+Lundbohmsv%C3%A4gen+74A,+98139+Kiruna,+Sweden&z=6&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vinovardag location"
              />
            </div>
            <MarkdownText className="mb-3 md:mb-6 p-base">
              {t("contact.info")}
            </MarkdownText>
            <MarkdownText className="mb-3 md:mb-6 p-base">
              {t("contact.email")}
            </MarkdownText>
          </div>
          <div>
            <MarkdownText className="mb-3 md:mb-6">
              {t("contact.formTitle")}
            </MarkdownText>
            <ContactForm />
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
