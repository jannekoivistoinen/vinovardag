"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import { Slider } from "@/components/Slider";
import { images } from "@/app/assets/images";
import { cn } from "@/lib/utils";

type SliderImage = { alt: string };

type HomeHostedCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

type ServicesRaw = {
  homeHosted: HomeHostedCopy;
};

export function HomeHostedSection({ className }: { className?: string }) {
  const t = useTranslations("page.services");
  const servicesSection = t.raw("services") as ServicesRaw;
  const sliderImages = t.raw("sliderImages") as SliderImage[];

  const eyebrow = servicesSection.homeHosted.eyebrow.replace(/\*\*/g, "");
  const remaining = servicesSection.homeHosted.description;
  const sliderImageSources = [
    { src: images.vinovardagCulinaryJourneys, alt: sliderImages[0].alt },
    { src: images.vinovardagWinetastings, alt: sliderImages[1].alt },
    { src: images.vinovardagOutdoor, alt: sliderImages[2].alt },
    { src: images.vinovardagHero, alt: sliderImages[3].alt },
  ];

  return (
    <section className={cn("container", className)}>
      <div className="max-w-4xl text-center mx-auto mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark mb-6">
          {eyebrow}
        </p>
        <MarkdownText className="mb-0">
          {servicesSection.homeHosted.title}
        </MarkdownText>
      </div>
      <div className="my-16">
        <Slider slidesPerView={1} showPagination={false}>
          {sliderImageSources.map((img) => (
            <Image
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className="w-full object-cover aspect-square md:aspect-video"
              quality={80}
              sizes="(min-width: 1920px) 2000px, (min-width: 1280px) 1440px, (min-width: 780px) 50vw, 90vw"
              loading="lazy"
            />
          ))}
        </Slider>
      </div>
      <div className="max-w-3xl text-center mx-auto">
        <MarkdownText className="text-slate-600 content p-base">
          {remaining}
        </MarkdownText>
      </div>
    </section>
  );
}
