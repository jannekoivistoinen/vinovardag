import MarkdownText from "@/components/MarkdownText";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { images, ImageKey } from "@/app/assets/images";
import { SITE_CONFIG, IMAGE_QUALITY } from "@/lib/constants";
import Image from "next/image";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHourglass,
  faUsers,
} from "@awesome.me/kit-b2cb81c624/icons/classic/solid";

interface ServiceDetails {
  type: string;
  time?: string;
  duration: string;
  capacity: string;
  note?: string;
}

interface Service {
  title: string;
  description: string;
  imageKey: ImageKey;
  altText: string;
  details: ServiceDetails;
  bookingUrl?: string;
}

interface ServicesSection {
  title: string;
  service: Service[];
  privateServices: PrivateServicesSection;
}

interface PrivateServicesSection {
  title: string;
  service: Service[];
}

interface ServicesPageProps {
  locale: string;
}

function DetailsList({
  details,
  timeLabel,
  durationLabel,
}: {
  details: ServiceDetails;
  timeLabel: string;
  durationLabel: string;
}) {
  const rows = [
    {
      icon: faClock,
      label: `${timeLabel}: ${details.time}`,
      show: !!details.time,
    },
    {
      icon: faHourglass,
      label: `${durationLabel}: ${details.duration}`,
      show: true,
    },
    { icon: faUsers, label: details.capacity, show: true },
  ];

  return (
    <ul className="space-y-2 mt-12 mb-6">
      <li className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-4">
        {details.type}
      </li>
      {rows
        .filter((r) => r.show)
        .map((r) => (
          <li
            key={r.label}
            className="flex items-center gap-3 text-md font-medium"
          >
            <FontAwesomeIcon
              icon={r.icon}
              className="w-4 h-4 text-brand-dark shrink-0"
            />
            <span>{r.label}</span>
          </li>
        ))}
      {details.note && (
        <li className="text-sm italic opacity-70 mt-1 pl-7">{details.note}</li>
      )}
    </ul>
  );
}

function ActivityGrid({
  services,
  bookNow,
  requestViaEmail,
  timeLabel,
  durationLabel,
}: {
  services: Service[];
  bookNow: string;
  requestViaEmail: string;
  timeLabel: string;
  durationLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {services.map((service) => (
        <div
          key={service.title}
          className="bg-[#EDEDDE] grid grid-cols-1 md:grid-cols-2 items-stretch"
        >
          <div className="relative aspect-[4/3] md:aspect-auto w-full overflow-hidden">
            <Image
              src={images[service.imageKey]}
              alt={service.altText}
              fill
              className="object-cover"
              quality={IMAGE_QUALITY}
              sizes="(min-width: 1280px) 640px, (min-width: 780px) 50vw, 100vw"
              loading="lazy"
            />
          </div>
          <div className="p-8 md:p-12">
            <MarkdownText className="mb-4">{service.title}</MarkdownText>
            <MarkdownText className="text-slate-700 content p-base">
              {service.description}
            </MarkdownText>
            <DetailsList
              details={service.details}
              timeLabel={timeLabel}
              durationLabel={durationLabel}
            />
            {service.bookingUrl ? (
              <a
                href={service.bookingUrl}
                className="rezdy rezdy-modal inline-flex items-center justify-center h-12 px-8 mt-2 bg-brand-primary !text-white hover:bg-brand-dark font-medium transition-colors cursor-pointer no-underline"
              >
                {bookNow}
              </a>
            ) : (
              <Button
                size="lg"
                className="mt-2 !text-white hover:no-underline"
                asChild
              >
                <a href="mailto:vinovardag@gmail.com">{requestViaEmail}</a>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ServicesPage({ locale }: ServicesPageProps) {
  const t = await getTranslations("page.services");
  const servicesSection = t.raw("services") as ServicesSection;
  const bookNow = t("bookNow");
  const requestViaEmail = t("requestViaEmail");
  const timeLabel = t("detailLabels.time");
  const durationLabel = t("detailLabels.duration");

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

        <ActivityGrid
          services={[
            ...servicesSection.service,
            ...servicesSection.privateServices.service,
          ]}
          bookNow={bookNow}
          requestViaEmail={requestViaEmail}
          timeLabel={timeLabel}
          durationLabel={durationLabel}
        />
      </section>

      <FAQ />
    </>
  );
}
