import Link from "next/link";
import { useTranslations } from "next-intl";
import { TerminalCTA } from "./TerminalCTA";

const Footer = () => {
  const t = useTranslations("component.footer");

  return (
    <>
      <TerminalCTA />
      <footer id="footer" className="w-full mb-12">
        <div className="container text-center md:text-left md:flex justify-between items-center py-4">
          <div>{t("copyright")}</div>
          <div>
            <Link
              href="https://instagram.com/vinovardag"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("instagram")}
            </Link>
          </div>
          <div>
            <Link href="/terms">{t("terms")}</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
