import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MarkdownText from "./MarkdownText";
import { images } from "@/app/assets/images";
import { IMAGE_QUALITY } from "@/lib/constants";

export function AboutHannaSection() {
  const t = useTranslations("component.aboutHanna");
  const hanna = images.hannaKarkea;

  return (
    <section id="about" className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-start">
        <div>
          <Image
            src={hanna}
            alt="Hanna Karkea"
            className="w-full h-auto object-cover aspect-[4/5]"
            style={{ maxWidth: hanna.width }}
            quality={IMAGE_QUALITY}
            sizes={`(min-width: 1024px) min(${hanna.width}px, 50vw), 100vw`}
          />
        </div>
        <div className="flex flex-col justify-between h-full md:pr-16">
          <div>
            <MarkdownText className="content mb-2 md:mb-3">
              {t("heading")}
            </MarkdownText>
            <h3 className="text-lg font-medium text-brand-brown mb-6">
              {t("subtitle")}
            </h3>
            <MarkdownText className="content p-lg mb-6 md:mb-12">
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
