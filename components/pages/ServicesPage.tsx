import { getTranslations } from "next-intl/server";
import MarkdownText from "@/components/MarkdownText";
import { Slider } from "@/components/Slider";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQ } from "@/components/FAQ";
import { images, ImageKey } from "@/app/assets/images";
import { SITE_CONFIG } from "@/lib/constants";

interface SlideCard {
  title: string;
  description: string;
  imageKey: ImageKey;
  altText: string;
  details: string;
}

interface ServicesPageProps {
  locale: string;
}

export default async function ServicesPage({ locale }: ServicesPageProps) {
  const t = await getTranslations("page.servicesLanding");
  const outdoorSlides = t.raw("outdoorSlides") as SlideCard[];
  const journeySlides = t.raw("journeySlides") as SlideCard[];
  const contactPath =
    SITE_CONFIG.i18n.routes.contact[
      locale as keyof typeof SITE_CONFIG.i18n.routes.contact
    ];

  return (
    <>
      <section className="container">
        <div className="max-w-5xl text-center mx-auto page-hero">
          <MarkdownText className="mb-3 md:mb-6">
            {t("outdoor.title")}
          </MarkdownText>
          <p className="mb-6 md:mb-12 text-lg max-w-3xl text-center mx-auto">
            {t("outdoor.ingress")}
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
        <div className="max-w-5xl text-center mx-auto">
          <MarkdownText className="mb-3 md:mb-6">
            {t("journeys.title")}
          </MarkdownText>
          <p className="mb-6 md:mb-12 text-lg max-w-3xl text-center mx-auto">
            {t("journeys.ingress")}
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

      <FAQ />
    </>
  );
}
