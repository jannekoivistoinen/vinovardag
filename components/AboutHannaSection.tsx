import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MarkdownText from "./MarkdownText";
import { images } from "@/app/assets/images";

export function AboutHannaSection() {
  const t = useTranslations("component.aboutHanna");

  return (
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
            <Image
              src={images.testimonialAvatar}
              alt="Testimonial Avatar"
              className="w-12 h-12 rounded-full mt-2 md:mt-0 object-cover mb-4 md:mb-6"
            />
            <MarkdownText className="italic text-gray-700 p-base">
              {t("quote")}
            </MarkdownText>
            <MarkdownText className="mt-2 text-sm text-gray-900">
              {t("quoteAttribution")}
            </MarkdownText>
          </div>

          <div>
            <MarkdownText className="content mb-6 md:mb-12">
              {t("heading")}
            </MarkdownText>
            <MarkdownText className="content p-lg text-brand-brown mb-6 md:mb-12">
              {t("paragraph")}
            </MarkdownText>
            <Link
              href="/about"
              className="p-base inline-flex items-center font-medium hover:text-brand-dark group"
            >
              {t("continueReading")}
              <span className="ml-1 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
