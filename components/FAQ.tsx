"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import Image from "next/image";
import { images } from "@/app/assets/images";
import { IMAGE_QUALITY } from "@/lib/constants";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface FAQProps {
  className?: string;
}

const FAQItem = ({
  id,
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps & { id: string }) => {
  return (
    <div className="border-b border-neutral-200">
      <button
        className="flex w-full items-center py-4 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="mr-4 text-brand-brown">{isOpen ? "−" : "+"}</span>
        <span className="text-lg font-medium">{question}</span>
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-in-out motion-reduce:transition-none ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible"
        }`}
      >
        <div className="overflow-hidden">
          <MarkdownText className="pb-8 pl-6 md:pl-12 p-base">
            {answer}
          </MarkdownText>
        </div>
      </div>
    </div>
  );
};

export function FAQ({}: FAQProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const t = useTranslations("component.faq");

  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  const handleClick = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) { next.delete(index); } else { next.add(index); }
      return next;
    });
  };

  return (
    <section id="FAQ">
      <div className="container">
        <Image
          src={images.peopleImage}
          alt="Guests gathered at a Vinovardag event"
          className="w-full h-full object-cover aspect-[3/2] lg:aspect-[3/1] mb-8 lg:mb-16"
          quality={IMAGE_QUALITY}
          sizes="(min-width: 1540px) 1440px, calc(100vw - 3rem)"
        />
      </div>
      <div className="container grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 md:mb-8 max-w-[400px]">
            <MarkdownText>{t("title")}</MarkdownText>
          </div>
          <MarkdownText className="content p-base max-w-xl">
            {t("description")}
          </MarkdownText>
        </div>
        <div>
          <div className="max-w-3xl">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                id={`faq-answer-${index}`}
                question={item.question}
                answer={item.answer}
                isOpen={openIndices.has(index)}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
