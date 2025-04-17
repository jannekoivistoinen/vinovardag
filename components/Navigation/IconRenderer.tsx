import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images, navigationIcons, IconKey } from "@/app/assets/images";

type IconRendererProps = {
  icon: IconKey;
  size?: number;
  className?: string;
};

export default function IconRenderer({
  icon,
  size = 20,
  className = "",
}: IconRendererProps) {
  if (icon in navigationIcons) {
    return (
      <FontAwesomeIcon
        icon={navigationIcons[icon as keyof typeof navigationIcons]}
        className={className || `h-${size / 4} w-${size / 4} text-brand-dark`}
      />
    );
  }

  return (
    <Image
      src={images[icon as keyof typeof images]}
      alt=""
      className={className || `h-${size / 4} w-${size / 4} object-contain`}
      width={size}
      height={size}
    />
  );
}
