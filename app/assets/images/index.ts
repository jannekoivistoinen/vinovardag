import testImage from "./image.png";
import vinovardagHero from "./vinovardag-hero.jpg";
import vinovardagCulinaryJourneys from "./vinovardag-culinaryjourneys.jpg";
import vinovardagOutdoor from "./vinovardag-outdoor.jpg";
import vinovardagWinetastings from "./vinovardag-winetastings.jpg";
import hannaKarkea from "./vinovardag-hanna-karkea.jpg";
import peopleImage from "./vinovardag-people.jpg";
import terminalImage from "./vinovardag-terminal.jpg";

// FontAwesome Icons
import { faSkiingNordic } from "@awesome.me/kit-b2cb81c624/icons/duotone/solid";
import { faInstagram } from "@awesome.me/kit-b2cb81c624/icons/classic/brands";

export const images = {
  // Content Images
  testImage,
  vinovardagHero,
  vinovardagCulinaryJourneys,
  vinovardagOutdoor,
  vinovardagWinetastings,
  hannaKarkea,
  peopleImage,
  terminalImage,
} as const;

export const navigationIcons = {
  nordicSkiing: faSkiingNordic,
  instagram: faInstagram,
} as const;

export type ImageKey = keyof typeof images;
export type IconKey = keyof typeof navigationIcons;
