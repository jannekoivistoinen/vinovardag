import { Slider } from "@/components/Slider";
import Image from "next/image";
import { images, ImageKey } from "@/app/assets/images";
import { getTranslations } from "next-intl/server";
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

interface SlideCard {
  title: string;
  description: string;
  imageKey: ImageKey;
  altText: string;
  details: string;
}

interface HomePageProps {
  locale: string;
}

export default async function HomePage({ locale }: HomePageProps) {
  const t = await getTranslations("page.homepage");
  const tServicesLanding = await getTranslations("page.servicesLanding");

  const services = t.raw("services.service") as Service[];
  const outdoorSlides = tServicesLanding.raw("outdoorSlides") as SlideCard[];
  const journeySlides = tServicesLanding.raw("journeySlides") as SlideCard[];
  const contactPath =
    SITE_CONFIG.i18n.routes.contact[
      locale as keyof typeof SITE_CONFIG.i18n.routes.contact
    ];

  return (
    <>
      <section className="container">
        <div className="text-center mx-auto page-hero">
          <MarkdownText className="max-w-[30ch] md:max-w-[50ch] text-center mx-auto text-balance">
            {t("hero.title")}
          </MarkdownText>
          <p className="mt-6 text-lg leading-relaxed max-w-[55ch] text-center mx-auto">
            {t("hero.ingress")}
          </p>
          <div className="mt-8 mb-8 md:mb-24 flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link
                className="!text-white"
                href={`/${locale}/${
                  SITE_CONFIG.i18n.routes.contact[
                    locale as keyof typeof SITE_CONFIG.i18n.routes.contact
                  ]
                }`}
              >
                {t("hero.ctaPrimary")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href={`/${locale}/${
                  SITE_CONFIG.i18n.routes.activities[
                    locale as keyof typeof SITE_CONFIG.i18n.routes.activities
                  ]
                }`}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={images.vinovardagHero}
          alt="Guests enjoying a Vinovardag wine experience in Swedish Lapland"
          className="w-full h-full object-cover aspect-square md:aspect-video mb-3 md:mb-6"
          quality={80}
          sizes="(min-width: 1920px) 2000px, (min-width: 1280px) 1440px, (min-width: 780px) 50vw, 90vw"
          priority
        />
      </section>

      <section className="container">
        <div className="max-w-5xl text-left">
          <MarkdownText className="mb-3 md:mb-6 text-left">
            {tServicesLanding("outdoor.title")}
          </MarkdownText>
          <p className="mb-6 md:mb-12 text-lg max-w-3xl text-left">
            {tServicesLanding("outdoor.ingress")}
          </p>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 3 }}
          showPagination={false}
        >
          {outdoorSlides.map((card) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              imageUrl={images[card.imageKey]}
              altText={card.altText}
              href={`/${locale}/${contactPath}`}
              description={card.description}
              details={card.details}
            />
          ))}
        </Slider>
      </section>

      <section className="container">
        <div className="max-w-5xl text-left">
          <MarkdownText className="mb-3 md:mb-6 text-left">
            {tServicesLanding("journeys.title")}
          </MarkdownText>
          <p className="mb-6 md:mb-12 text-lg max-w-3xl text-left">
            {tServicesLanding("journeys.ingress")}
          </p>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 4 }}
          showPagination={false}
        >
          {journeySlides.map((card) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              imageUrl={images[card.imageKey]}
              altText={card.altText}
              href={`/${locale}/${contactPath}`}
              description={card.description}
              details={card.details}
            />
          ))}
        </Slider>
      </section>

      <section id="services" className="container">
        <div className="max-w-5xl">
          <MarkdownText className="mb-6 md:mb-12">
            {t("services.title")}
          </MarkdownText>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 4 }}
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
                href={`/${locale}/${SITE_CONFIG.i18n.routes.activities[locale as keyof typeof SITE_CONFIG.i18n.routes.activities]}`}
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
