import Image from "next/image";
import { images, ImageKey } from "@/app/assets/images";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MarkdownText from "../MarkdownText";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { Slider } from "@/components/Slider";
import { SITE_CONFIG, IMAGE_QUALITY } from "@/lib/constants";

interface CardItem {
  title: string;
  description: string;
  bullets: string[];
  imageKey: ImageKey;
  altText: string;
}

interface HomePageProps {
  locale: string;
}

export default async function HomePage({ locale }: HomePageProps) {
  const t = await getTranslations("page.homepage");

  const cards = t.raw("cards.items") as CardItem[];
  const contactPath =
    SITE_CONFIG.i18n.routes.contact[
      locale as keyof typeof SITE_CONFIG.i18n.routes.contact
    ];
  const servicesPath =
    SITE_CONFIG.i18n.routes.services[
      locale as keyof typeof SITE_CONFIG.i18n.routes.services
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
          <div className="hero-ctas mt-8 mb-8 md:mb-24 flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link
                className="!text-white"
                href={`/${locale}/${contactPath}`}
              >
                {t("hero.ctaPrimary")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${locale}/${servicesPath}`}>
                {t("hero.ctaSecondary")}
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={images.vinovardagHero}
          alt="Guests enjoying a Vinovardag wine experience in Swedish Lapland"
          className="w-full h-full object-cover aspect-square md:aspect-video mb-3 md:mb-6"
          quality={IMAGE_QUALITY}
          sizes="(min-width: 1540px) 1440px, calc(100vw - 3rem)"
          priority
        />
      </section>

      <section className="container">
        <div className="max-w-5xl text-left">
          <MarkdownText className="mb-6 md:mb-12 text-left">
            {t("cards.sectionTitle")}
          </MarkdownText>
        </div>
        <Slider
          slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 3 }}
          showPagination={false}
        >
          {cards.map((card) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              imageUrl={images[card.imageKey]}
              altText={card.altText}
              href={`/${locale}/${servicesPath}`}
              details=""
            />
          ))}
        </Slider>
      </section>

      <FAQ />
    </>
  );
}
