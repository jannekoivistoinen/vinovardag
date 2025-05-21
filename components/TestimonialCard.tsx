import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";

interface TestimonialCardProps {
  title: string;
  imageUrl?: StaticImageData;
  altText?: string;
  href?: string;
  description?: string;
  className?: string;
}

export function TestimonialCard({
  title,
  imageUrl,
  altText,
  description,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`block overflow-hidden bg-brand-beige-lightest p-12 h-full ${className}`}
    >
      {imageUrl && altText && (
        <div className="relative aspect-[2/3]">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover"
            quality={80}
            sizes="(min-width: 1280px) 1200px, (min-width: 780px) 50vw, 90vw"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col justify-between h-full">
        <div>
          <MarkdownText className="text-2xl font-medium mb-48">
            {title}
          </MarkdownText>
        </div>
        {description && (
          <MarkdownText className="text-base mt-auto p-base">
            {description}
          </MarkdownText>
        )}
      </div>
    </div>
  );
}
