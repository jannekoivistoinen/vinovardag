import { IconKey } from "@/app/assets/images";

export type LocaleData = {
  name: string;
  href: string;
  description?: string;
};

export type NavigationItem = {
  link: string;
  [key: string]:
    | LocaleData
    | string
    | {
        link: string;
        icon?: IconKey;
        en: LocaleData;
        fi: LocaleData;
      }[]
    | undefined;
  en: LocaleData;
  fi: LocaleData;
  sublinks?: {
    link: string;
    icon?: IconKey;
    en: LocaleData;
    fi: LocaleData;
  }[];
};

// Helper function to check if a value is LocaleData
export function isLocaleData(value: unknown): value is LocaleData {
  return (
    value !== null &&
    typeof value === "object" &&
    "name" in (value as Record<string, unknown>) &&
    "href" in (value as Record<string, unknown>)
  );
}
