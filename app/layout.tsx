import "./styles/globals.scss";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sv" }];
}

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
