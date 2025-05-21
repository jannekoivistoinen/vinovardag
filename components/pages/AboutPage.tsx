"use client";

import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/app/assets/images";
import Values from "@/components/Values";

export default function AboutPage() {
  const t = useTranslations("page.about");

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl">
          <MarkdownText className="mb-3 md:mb-6">
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

      <section id="hanna-profile" className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
          <div>
            <Image
              src={images.hannaKarkea}
              alt="Hanna Karkea"
              className="w-full h-auto object-cover aspect-[4/5]"
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="flex flex-col h-full">
            <MarkdownText className="mb-3">
              {t("hannaProfile.title")}
            </MarkdownText>
            <h3 className="text-lg font-medium text-brand-brown mb-6">
              {t("hannaProfile.subtitle")}
            </h3>
            <MarkdownText className="p-lg mb-8 content">
              {t("hannaProfile.bio")}
            </MarkdownText>
            <blockquote className="text-brand-brown italic p-lg border-l-4 border-brand-brown pl-4 mt-auto">
              {t("hannaProfile.quote")}
            </blockquote>
          </div>
        </div>
      </section>

      <Values />

      <section id="story" className="container mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
          <div>
            <Image
              src={images.vinovardagWinetastings}
              alt="Hanna Karkea"
              className="w-full h-auto object-cover aspect-[4/5]"
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="flex flex-col h-full">
            <MarkdownText className="mb-6">{t("about.title")}</MarkdownText>
            <MarkdownText className="mb-12 p-lg content">
              {t("about.description")}
            </MarkdownText>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
