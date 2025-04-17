"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface FAQProps {
  className?: string;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-neutral-200">
      <button
        className="flex w-full items-center py-4 text-left"
        onMouseDown={onClick}
      >
        <span className="mr-4">{isOpen ? "−" : "+"}</span>
        <span className="text-lg font-medium">{question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <MarkdownText className="pb-8 pl-6 md:pl-12">{answer}</MarkdownText>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ({ className = "" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("accommodation");
  const t = useTranslations("component.faq");

  const categories = {
    accommodation: t("categories.accommodation"),
    activities: t("categories.activities"),
  };

  const items = t.raw(`items.${activeCategory}`) as Array<{
    question: string;
    answer: string;
  }>;

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="FAQ"
      className={`bg-brand-light/50 pt-12 md:mt-[-12.5%] md:pt-[12.5%] ${className}`}
    >
      <div className="container grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 md:mb-8 text-brand-dark max-w-[400px]">
            <MarkdownText>{t("title")}</MarkdownText>
          </div>
          <MarkdownText className="p-base max-w-xl">
            {t("description")}
          </MarkdownText>
        </div>
        <div>
          <div className="mb-2 md:mb-8 flex gap-2 md:gap-8 border-b border-[#F1F1F0]">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onMouseDown={() => setActiveCategory(key)}
                className={`px-3 md:px-6 py-4 md:py-8 text-lg ${
                  activeCategory === key
                    ? "animate text-[#141414] shadow-[inset_0_-1px_white,_0_1px_black] transition fade-in"
                    : "text-[#141414] transition hover:text-brand-dark"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
