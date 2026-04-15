import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/constants";

interface ServiceCardProps {
  title: string;
  imageUrl: StaticImageData;
  altText: string;
  href: string;
  description: string;
  details: string;
  callToAction?: string;
  className?: string;
  /** Merged onto the outer link (e.g. Rezdy modal classes) */
  linkClassName?: string;
}

export function ServiceCard({
  title,
  imageUrl,
  altText,
  href,
  description,
  linkClassName,
}: ServiceCardProps) {
  return (
    <Link
      href={href || "/en/activities"}
      className={cn("group block", linkClassName)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          quality={IMAGE_QUALITY}
          sizes="(min-width: 1280px) 33vw, (min-width: 780px) 50vw, 85vw"
          loading="lazy"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <MarkdownText className="group-hover:text-black transition-all duration-300 no-underline">
            {title}
          </MarkdownText>
        </div>
        {description && (
          <p className="mt-1 text-black line-clamp-3 mr-6">{description}</p>
        )}
      </div>
    </Link>
  );
}
