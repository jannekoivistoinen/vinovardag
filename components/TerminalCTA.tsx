import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import Image from "next/image";
import { images } from "@/app/assets/images";
export function TerminalCTA() {
  const t = useTranslations("component.terminalCTA");

  return (
    <div id="terminalCTA" className="container pb-[5vw]">
      <MarkdownText className="text-brand-dark mx-auto text-center max-w-4xl mb-8 md:mb-16">
        {t("title")}
      </MarkdownText>
      <Image
        src={images.testImage}
        alt="Test Image"
        className="w-full h-full object-cover aspect-square md:aspect-video"
      />
    </div>
  );
}
