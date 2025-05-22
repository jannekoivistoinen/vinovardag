import { useTranslations, useLocale } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import Image from "next/image";
import { images } from "@/app/assets/images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function TerminalCTA() {
  const t = useTranslations("component.terminalCTA");
  const locale = useLocale();

  return (
    <div id="terminalCTA" className="container mb-4">
      <div className="flex flex-col lg:flex-row bg-[#503825] text-white">
        <div className="order-2 lg:order-1 lg:w-1/2 flex flex-col justify-center text-center py-16 px-8 md: p-24 lg:p-32">
          <MarkdownText className="mb-4">{t("title")}</MarkdownText>
          <MarkdownText className="mb-12 p-base text-white/60">
            {t("description")}
          </MarkdownText>
          <Button size="lg" className="max-w-30 mx-auto">
            <Link
              href={`/${locale}/${
                SITE_CONFIG.i18n.routes.contact[
                  locale as keyof typeof SITE_CONFIG.i18n.routes.contact
                ]
              }`}
              className="hover:no-underline"
            >
              {t("label")}
            </Link>
          </Button>
        </div>
        <div className="order-1 lg:order-2 lg:w-1/2">
          <Image
            src={images.terminalImage}
            alt="Test Image"
            className="w-full h-full object-cover aspect-[3/2] lg:aspect-square"
          />
        </div>
      </div>
    </div>
  );
}
