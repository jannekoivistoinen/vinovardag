import MarkdownText from "@/components/MarkdownText";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { images, ImageKey } from "@/app/assets/images";
import { SITE_CONFIG } from "@/lib/constants";
import { Slider } from "@/components/SliderDynamic";
import { ServiceCard } from "@/components/ServiceCard";
import Script from "next/script";
import ReactDOM from "react-dom";

interface CardItem {
  title: string;
  description: string;
  bullets: string[];
  imageKey: ImageKey;
  altText: string;
  bookingUrl?: string;
}

interface ServicesPageProps {
  locale: string;
}

function ServiceOfferingBlock({
  card,
  locale,
  servicesPath,
  learnMoreAndBook,
  requestViaEmail,
}: {
  card: CardItem;
  locale: string;
  servicesPath: string;
  learnMoreAndBook: string;
  requestViaEmail: string;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <ServiceCard
        title={card.title}
        imageUrl={images[card.imageKey]}
        altText={card.altText}
        href={`/${locale}/${servicesPath}`}
        description={card.description}
        bullets={card.bullets}
        details=""
      />
      {card.bookingUrl ? (
        <a
          href={card.bookingUrl}
          className="rezdy rezdy-modal inline-flex items-center justify-center h-12 px-8 mt-auto bg-brand-primary !text-white hover:bg-brand-dark font-medium transition-colors cursor-pointer no-underline self-start"
        >
          {learnMoreAndBook}
        </a>
      ) : (
        <Button
          size="lg"
          className="mt-auto !text-white hover:no-underline self-start"
          asChild
        >
          <a href={`mailto:${SITE_CONFIG.company.contact.email}`}>
            {requestViaEmail}
          </a>
        </Button>
      )}
    </div>
  );
}

export default async function ServicesPage({ locale }: ServicesPageProps) {
  ReactDOM.preconnect("https://outdoornorth67.rezdy.com");
  const [t, tHome] = await Promise.all([
    getTranslations("page.services"),
    getTranslations("page.homepage"),
  ]);
  const cards = tHome.raw("cards.items") as CardItem[];
  const requestViaEmail = t("requestViaEmail");
  const learnMoreAndBook = t("learnMoreAndBook");

  const servicesPath =
    SITE_CONFIG.i18n.routes.services[
      locale as keyof typeof SITE_CONFIG.i18n.routes.services
    ];

  return (
    <>
      <Script
        src="https://outdoornorth67.rezdy.com/pluginJs?script=modal"
        strategy="lazyOnload"
      />
      <section className="container">
        <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24 page-hero">
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

        <div className="flex flex-col gap-10 md:hidden">
          {cards.map((card) => (
            <ServiceOfferingBlock
              key={card.title}
              card={card}
              locale={locale}
              servicesPath={servicesPath}
              learnMoreAndBook={learnMoreAndBook}
              requestViaEmail={requestViaEmail}
            />
          ))}
        </div>
        <div className="hidden md:block">
          <Slider
            slidesPerView={{ mobile: 1.05, tablet: 2, desktop: 2.5 }}
            showPagination={false}
          >
            {cards.map((card) => (
              <ServiceOfferingBlock
                key={card.title}
                card={card}
                locale={locale}
                servicesPath={servicesPath}
                learnMoreAndBook={learnMoreAndBook}
                requestViaEmail={requestViaEmail}
              />
            ))}
          </Slider>
        </div>
      </section>

      <FAQ />
    </>
  );
}
