import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";
import { images } from "@/app/assets/images";
interface TestimonialCardProps {
  name: string;
  imageUrl?: StaticImageData;
  altText?: string;
  href?: string;
  quote?: string;
  className?: string;
}

export function TestimonialCard({
  name,
  imageUrl,
  altText,
  quote,
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
          {quote && (
            <MarkdownText className="italic text-base mt-auto p-base text-brand-brown mb-40">
              {quote}
            </MarkdownText>
          )}
        </div>
        <div className="flex items-center">
          <Image
            src={images.testimonialAvatar}
            alt="Testimonial Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <MarkdownText className="ml-4">{name}</MarkdownText>
        </div>
      </div>
    </div>
  );
}
