import testImage from "./image.png";

// FontAwesome Icons
import { faSkiingNordic } from "@awesome.me/kit-b2cb81c624/icons/duotone/solid";

import { faInstagram } from "@awesome.me/kit-b2cb81c624/icons/classic/brands";

export const images = {
  // Content Images
  testImage,
} as const;

export const navigationIcons = {
  nordicSkiing: faSkiingNordic,
  instagram: faInstagram,
} as const;

export type ImageKey = keyof typeof images;
export type IconKey = keyof typeof navigationIcons;
