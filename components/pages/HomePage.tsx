"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Slider } from "@/components/Slider";
import Image from "next/image";
import { images, ImageKey } from "@/app/assets/images";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MarkdownText from "../MarkdownText";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { AboutHannaSection } from "@/components/AboutHannaSection";
import { SITE_CONFIG } from "@/lib/constants";

interface Service {
  title: string;
  description: string;
  imageKey: ImageKey;
  altText: string;
  link: string;
  details: string;
}

export default function HomePage() {
  const { locale } = useParams();
  const t = useTranslations("page.homepage");

  useEffect(() => {
    console.log("Current locale:", locale);
  }, [locale]);

  const services = t.raw("services.service") as Service[];

  return (
    <>
      <section className="container">
        <div className="max-w-[800px]">
          <MarkdownText>{t("hero.title")}</MarkdownText>
          <div className="mt-8 mb-8 md:mb-24 flex gap-4">
            <Button size="lg" asChild>
              <Link
                className="!text-white"
                href={`/${locale}/${
                  SITE_CONFIG.i18n.routes.contact[
                    locale as keyof typeof SITE_CONFIG.i18n.routes.contact
                  ]
                }`}
              >
                Get in touch
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn more
            </Button>
          </div>
        </div>
        <Image
          src={images.vinovardagHero}
          alt="Test Image"
          className="w-full h-full object-cover aspect-square md:aspect-video mb-3 md:mb-6"
          quality={80}
          sizes="(min-width: 1920px) 2000px, (min-width: 1280px) 1440px, (min-width: 780px) 50vw, 90vw"
          priority
        />
        <p>Explore the beautiful pairing of wine and wilderness.</p>
      </section>

      <section id="services" className="container">
        <div className="max-w-5xl">
          <MarkdownText className="mb-6 md:mb-12">
            {t("services.title")}
          </MarkdownText>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 3 }}
          showPagination={false}
        >
          {services &&
            Array.isArray(services) &&
            services.map((service) => (
              <ServiceCard
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

      <FAQ />
    </>
  );
}
