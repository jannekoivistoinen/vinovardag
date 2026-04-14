import { getTranslations } from "next-intl/server";
import MarkdownText from "./MarkdownText";
import { ValueCard } from "@/components/ValueCard";
import { Slider } from "./Slider";

interface ValueItem {
  title: string;
  text: string;
}

export default async function Values() {
  const t = await getTranslations("component.values");

  const valueItems = t.raw("items") as ValueItem[];

  return (
    <section className="container">
      <MarkdownText className="p-lg mb-12 content text-center">
        {t("sectionTitle")}
      </MarkdownText>
      <Slider
        slidesPerView={{ mobile: 1.2, tablet: 1.5, desktop: 2 }}
        showPagination={false}
      >
        {valueItems &&
          Array.isArray(valueItems) &&
          valueItems.map((item) => (
            <ValueCard
              key={item.title}
              title={item.title}
              description={item.text}
              className="bg-[#EDEDDE]"
            />
          ))}
      </Slider>
    </section>
  );
}
