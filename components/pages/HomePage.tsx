"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Slider } from "@/components/Slider";
import Image from "next/image";
import { images, ImageKey } from "@/app/assets/images";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MarkdownText from "../MarkdownText";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ActivityCard";

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
            <Button size="lg">Get in touch</Button>
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
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          showPagination={false}
        >
          {services &&
            Array.isArray(services) &&
            services.map((service) => (
              <ActivityCard
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

      <section id="about" className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-center">
          <div>
            <Image
              src={images.hannaKarkea}
              alt="Hanna Karkea"
              className="w-full h-auto object-cover aspect-[4/5]"
              quality={80}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-between h-full md:pr-16">
            <div className="relative mb-16">
              <blockquote className="italic text-gray-700 p-base">
                {t("aboutHanna.quote")}
              </blockquote>
              <p className="mt-2 text-sm text-gray-900">
                {t("aboutHanna.quoteAttribution")}
              </p>
            </div>

            <div>
              <MarkdownText className="content mb-6 md:mb-12">
                {t("aboutHanna.heading")}
              </MarkdownText>
              <MarkdownText className="content p-lg text-brand-brown mb-6 md:mb-12">
                {t("aboutHanna.paragraph")}
              </MarkdownText>
              <Link
                href="/about"
                className="p-base inline-flex items-center font-medium hover:text-brand-dark group"
              >
                {t("aboutHanna.continueReading")}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
