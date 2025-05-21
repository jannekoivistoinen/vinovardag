"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Slider } from "./Slider";

interface TestimonialItem {
  title: string;
  text: string;
}

export default function Testimonials() {
  const { locale } = useParams();
  const t = useTranslations("component.testimonials");

  useEffect(() => {
    console.log("Current locale:", locale);
  }, [locale]);

  const testimonialItems = t.raw("items") as TestimonialItem[];

  return (
    <>
      <Slider
        slidesPerView={{ mobile: 1.2, tablet: 1.5, desktop: 2 }}
        showPagination={false}
      >
        {testimonialItems &&
          Array.isArray(testimonialItems) &&
          testimonialItems.map((item) => (
            <TestimonialCard
              key={item.title}
              title={item.title}
              description={item.text}
              className="bg-[#EDEDDE]"
            />
          ))}
      </Slider>
    </>
  );
}
