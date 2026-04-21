import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/app/assets/images";
import Values from "@/components/Values";
import { SITE_CONFIG, IMAGE_QUALITY } from "@/lib/constants";

interface AboutPageProps {
  locale: string;
}

export default async function AboutPage({ locale }: AboutPageProps) {
  const t = await getTranslations("page.about");
  const hanna = images.hannaKarkea;

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl page-hero">
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
              href={`/${locale}/${
                SITE_CONFIG.i18n.routes.contact[
                  locale as keyof typeof SITE_CONFIG.i18n.routes.contact
                ]
              }`}
              className="hover:no-underline"
            >
              {t("hero.buttonText")}
            </Link>
          </Button>
        </div>
      </section>

      <section
        id="hanna-profile"
        className="about-hanna-section container"
      >
        <div className="about-profile-layout grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start">
          <div className="md:sticky md:top-[100px] md:self-start">
            <Image
              src={hanna}
              alt="Hanna Karkea"
              className="w-full h-auto object-cover aspect-[4/5]"
              style={{ maxWidth: hanna.width }}
              quality={IMAGE_QUALITY}
              sizes={`(min-width: 1024px) min(${hanna.width}px, 50vw), 100vw`}
              priority
            />
          </div>
          <div className="flex flex-col">
            <MarkdownText className="mb-3">
              {t("hannaProfile.title")}
            </MarkdownText>
            <div className="flex flex-row items-center gap-8 flex-wrap my-8">
              <Link
                href="https://vinkallan.se/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0"
              >
                <Image
                  src="/vinkallan-logo-transparent.png"
                  alt="Vinkällan Dryckesutbildningar"
                  width={160}
                  height={100}
                  className="h-20 w-auto"
                />
              </Link>
              <Link
                href="https://www.wsetglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0"
              >
                <Image
                  src="/wset-logo.png"
                  alt="WSET Wine & Spirit Education Trust"
                  width={293}
                  height={139}
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <MarkdownText className="p-lg mb-6 content">
              {t("hannaProfile.bio")}
            </MarkdownText>
            <p className="text-2xl font-medium text-brand-brown mb-1">
              {t("hannaProfile.closingName")}
            </p>
            {t("hannaProfile.subtitle") ? (
              <h3 className="text-lg font-medium text-brand-brown">
                {t("hannaProfile.subtitle")}
              </h3>
            ) : null}
          </div>
        </div>
      </section>

      <Values />

      <FAQ />
    </>
  );
}
