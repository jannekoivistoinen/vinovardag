import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";

interface ServiceCardProps {
  title: string;
  imageUrl: StaticImageData;
  altText: string;
  href: string;
  description: string;
  details: string;
  callToAction?: string;
  className?: string;
}

export function ServiceCard({
  title,
  imageUrl,
  altText,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <div className={`block overflow-hidden ${className}`}>
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

      <div>
        <MarkdownText className="mt-4 mb-8">{title}</MarkdownText>
        <MarkdownText className="text-slate-700 mb-4 content p-base mr-8 lg:mr-16">
          {description}
        </MarkdownText>
      </div>
    </div>
  );
}
