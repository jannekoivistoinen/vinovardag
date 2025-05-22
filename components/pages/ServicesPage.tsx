"use client";

import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Values from "@/components/Values";
import { AboutHannaSection } from "@/components/AboutHannaSection";
import { Slider } from "../Slider";
import { images, ImageKey } from "@/app/assets/images";
import { ServiceDetailsCard } from "@/components/ServiceDetailsCard";
import { SITE_CONFIG } from "@/lib/constants";

interface Service {
  title: string;
  description: string;
  imageKey: ImageKey;
  altText: string;
  link: string;
  details: string;
}

export default function ServicesPage() {
  const t = useTranslations("page.services");
  const locale = useLocale();
  const services = t.raw("services.service") as Service[];

  return (
    <>
      <section className="container">
        <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24">
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
              target="_blank"
            >
              {t("hero.buttonText")}
            </Link>
          </Button>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 1.5, desktop: 2 }}
          showPagination={false}
        >
          {services &&
            Array.isArray(services) &&
            services.map((service) => (
              <ServiceDetailsCard
                key={service.title}
                title={service.title}
                imageUrl={images[service.imageKey]}
                altText={service.altText}
                href={service.link}
                description={service.description}
                details={service.details}
              />
            ))}
        </Slider>
      </section>

      <AboutHannaSection />
      <Values />
      <FAQ />
    </>
  );
}
