import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";
import { Button } from "./ui/button";
import { IMAGE_QUALITY } from "@/lib/constants";
interface ServiceDetailsCardProps {
  title: string;
  imageUrl: StaticImageData;
  altText: string;
  href: string;
  description: string;
  details: string;
  callToAction?: string;
  className?: string;
}

export function ServiceDetailsCard({
  title,
  imageUrl,
  altText,
  description,
  className = "",
}: ServiceDetailsCardProps) {
  return (
    <div className={`block overflow-hidden ${className}`}>
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover"
          quality={IMAGE_QUALITY}
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="lazy"
        />
      </div>

      <div>
        <MarkdownText className="mt-8 mb-4">{title}</MarkdownText>
        <MarkdownText className="text-slate-700 mb-4 content p-base mr-8 lg:mr-16">
          {description}
        </MarkdownText>
      </div>
      <Button size="lg" className="mt-4">
        Inquire
      </Button>
    </div>
  );
}
