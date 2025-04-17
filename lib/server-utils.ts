import { cookies } from "next/headers";
import { defaultLocale } from "./constants";

export async function getLanguageFromCookie(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE");
    return localeCookie?.value || defaultLocale;
  } catch {
    return defaultLocale;
  }
}
