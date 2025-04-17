import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  translationNamespace: string;
  showBookButton?: boolean;
  scrollToId?: string;
  translationParams?: Record<string, string>;
}

export function HeroSection({
  translationNamespace,
  showBookButton = false,
  scrollToId = "book",
  translationParams = {},
}: HeroSectionProps) {
  const t = useTranslations(translationNamespace);

  const handleScroll = () => {
    const section = document.getElementById(scrollToId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24">
      <MarkdownText className="text-brand-dark mb-3 md:mb-6">
        {t("hero.title")}
      </MarkdownText>
      <MarkdownText className="p-lg content">
        {t("hero.description", translationParams)}
      </MarkdownText>
      {showBookButton && (
        <Button size="lg" className="mx-auto mt-8" onClick={handleScroll}>
          {t("hero.buttonText", { fallback: "Book now" })}
        </Button>
      )}
    </div>
  );
}
