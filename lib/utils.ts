import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLanguageCookie(locale: string) {
  // Set the NEXT_LOCALE cookie with the new locale
  // The cookie should be available for the whole site (path: '/')
  // and expire in 1 year (365 days)
  Cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365 });
}
