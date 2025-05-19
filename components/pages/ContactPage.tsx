"use client";

import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const t = useTranslations("page.contact");

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24">
          <MarkdownText className="text-brand-dark mb-3 md:mb-6">
            {t("hero.title")}
          </MarkdownText>
          <MarkdownText className="p-lg content">
            {t("hero.description")}
          </MarkdownText>
          <Button
            size="lg"
            className="mx-auto mt-8 !text-white hover:no-underline"
            asChild
          >
            <Link
              href="/tuotekortit_hinnasto_luckyranch.pdf"
              className="hover:no-underline"
              target="_blank"
            >
              {t("hero.buttonText")}
            </Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="container content">
        <div className="md:mx-auto md:text-center max-w-4xl">
          <MarkdownText className="text-brand-dark mb-6">
            {t("contact.title")}
          </MarkdownText>
          <MarkdownText className="mb-12 p-lg">
            {t("contact.description")}
          </MarkdownText>
        </div>
      </section>
      <FAQ />
    </>
  );
}
