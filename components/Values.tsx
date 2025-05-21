"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import MarkdownText from "./MarkdownText";
import { ValueCard } from "@/components/ValueCard";
import { Slider } from "./Slider";

interface ValueItem {
  title: string;
  text: string;
}

export default function Values() {
  const { locale } = useParams();
  const t = useTranslations("component.values");

  useEffect(() => {
    console.log("Current locale:", locale);
  }, [locale]);

  const valueItems = t.raw("items") as ValueItem[];

  return (
    <section className="container">
      <MarkdownText className="p-lg mb-8 content">
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
