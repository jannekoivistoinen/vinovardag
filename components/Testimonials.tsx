import { getTranslations } from "next-intl/server";
import MarkdownText from "./MarkdownText";
import { TestimonialCard } from "@/components/TestimonialCard";
import { images, ImageKey } from "@/app/assets/images";

interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
  imageKey?: ImageKey;
  altText?: string;
}

export default async function Testimonials() {
  const t = await getTranslations("component.testimonials");

  const items = t.raw("items") as TestimonialItem[];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="container">
      <MarkdownText className="p-lg mb-6 md:mb-12 content md:text-center">
        {t("sectionTitle")}
      </MarkdownText>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <TestimonialCard
            key={item.name}
            quote={item.quote}
            name={item.name}
            role={item.role}
            imageUrl={item.imageKey ? images[item.imageKey] : undefined}
            altText={item.altText}
          />
        ))}
      </div>
    </section>
  );
}
