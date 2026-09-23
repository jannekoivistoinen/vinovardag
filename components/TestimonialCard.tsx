import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";
import { IMAGE_QUALITY } from "@/lib/constants";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  imageUrl?: StaticImageData;
  altText?: string;
  className?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${last}`.toUpperCase();
}

export function TestimonialCard({
  quote,
  name,
  role,
  imageUrl,
  altText,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`flex flex-col h-full bg-[#EDEDDE] p-8 md:p-12 ${className}`}
    >
      <span
        aria-hidden="true"
        className="block font-heading text-6xl leading-none text-brand-primary mb-4"
      >
        &rdquo;
      </span>
      <MarkdownText className="italic p-base content text-brand-brown">
        {quote}
      </MarkdownText>

      <div className="flex items-center mt-auto pt-8">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText ?? name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
            width={64}
            height={64}
            quality={IMAGE_QUALITY}
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex items-center justify-center w-16 h-16 rounded-full shrink-0 bg-brand-brown/10 text-brand-brown font-medium"
          >
            {getInitials(name)}
          </span>
        )}
        <div className="ml-4">
          <p className="font-medium text-brand-brown">{name}</p>
          {role && <p className="text-sm text-brand-brown/80">{role}</p>}
        </div>
      </div>
    </div>
  );
}
