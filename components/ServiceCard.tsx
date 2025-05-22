import Image, { StaticImageData } from "next/image";
import MarkdownText from "./MarkdownText";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@awesome.me/kit-b2cb81c624/icons/classic/light";

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

// Map feature icons to Font Awesome icons
const featureIcons: { [key: string]: IconDefinition } = {
  arrow: faArrowRightLong,
};

export function ServiceCard({ title, imageUrl, altText }: ServiceCardProps) {
  return (
    <Link href="/en/services" className="group block">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          quality={80}
          sizes="(min-width: 1280px) 1200px, (min-width: 780px) 50vw, 90vw"
          loading="lazy"
        />
      </div>

      <div className="flex items-center mt-4">
        <MarkdownText className="group-hover:text-black transition-all duration-300 no-underline">
          {title}
        </MarkdownText>
        <FontAwesomeIcon
          icon={featureIcons.arrow}
          className="ml-4 w-5 h-5 text-brand-dark transition-all duration-300 group-hover:ml-6"
        />
      </div>
    </Link>
  );
}
