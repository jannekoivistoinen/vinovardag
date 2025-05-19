import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NAVIGATION_LINKS, NAVIGATION_CTA, SITE_CONFIG } from "@/lib/constants";
import { images, navigationIcons } from "@/app/assets/images";
import { NavigationItem } from "./types";
import {
  desktopLinkStyles,
  desktopPopoverContentStyles,
  desktopPopoverLinkActiveStyles,
  desktopPopoverLinkDescStyles,
  desktopPopoverLinkStyles,
  desktopPopoverLinkTitleStyles,
  desktopPopoverTriggerStyles,
  linkStylesActive,
} from "./styles";
import { getLocaleData, isActive } from "./utils";
import LanguageSwitcher from "./LanguageSwitcher";

type DesktopNavigationProps = {
  pathname: string;
  locale: string;
  isScrolled: boolean;
  openPopover: string | null;
  setOpenPopover: (value: string | null) => void;
};

export default function DesktopNavigation({
  pathname,
  locale,
  isScrolled,
  openPopover,
  setOpenPopover,
}: DesktopNavigationProps) {
  return (
    <>
      <div className="hidden xl:flex justify-center">
        {NAVIGATION_LINKS.map((item: NavigationItem) => {
          const localeData = getLocaleData(item, locale);
          const active = isActive(localeData.href, pathname);

          if (item.sublinks) {
            return (
              <Popover
                key={item.link}
                open={openPopover === item.link}
                onOpenChange={(open) => {
                  setOpenPopover(open ? item.link : null);
                }}
              >
                <PopoverTrigger
                  className={`${desktopLinkStyles} ${
                    active ? linkStylesActive : ""
                  } group`}
                >
                  <span className={desktopPopoverTriggerStyles}>
                    {localeData.name}
                    <motion.div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className={desktopPopoverContentStyles}
                  align="start"
                >
                  <div className="p-8">
                    <h3 className={desktopPopoverLinkTitleStyles}>
                      {getLocaleData(item, locale).name}
                    </h3>
                    <div>
                      {item.sublinks?.map((sublink) => {
                        const sublinkLocaleData = getLocaleData(
                          sublink,
                          locale
                        );
                        return (
                          <Link
                            key={sublink.link}
                            href={sublinkLocaleData.href}
                            onClick={() => setOpenPopover(null)}
                            className={`${desktopPopoverLinkStyles} ${
                              isActive(sublinkLocaleData.href, pathname)
                                ? desktopPopoverLinkActiveStyles
                                : ""
                            }`}
                          >
                            {sublink.icon &&
                              (sublink.icon in navigationIcons ? (
                                <FontAwesomeIcon
                                  icon={
                                    navigationIcons[
                                      sublink.icon as keyof typeof navigationIcons
                                    ]
                                  }
                                  className="h-5 w-5 text-brand-dark"
                                />
                              ) : (
                                <Image
                                  src={
                                    images[sublink.icon as keyof typeof images]
                                  }
                                  alt=""
                                  className="h-5 w-5 object-contain"
                                  width={20}
                                  height={20}
                                />
                              ))}
                            <div>
                              <span className={desktopPopoverLinkTitleStyles}>
                                {sublinkLocaleData.name}
                              </span>
                              {sublinkLocaleData.description && (
                                <p className={desktopPopoverLinkDescStyles}>
                                  {sublinkLocaleData.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <Link
              key={item.link}
              href={localeData.href}
              className={`${desktopLinkStyles} ${
                active ? linkStylesActive : ""
              }`}
            >
              {localeData.name}
            </Link>
          );
        })}
      </div>
      <div className="hidden xl:flex xl:justify-end">
        <div className="flex items-center gap-4 px-6">
          {SITE_CONFIG.i18n.languageSwitcher.showOnDesktop && (
            <LanguageSwitcher />
          )}
          {NAVIGATION_CTA.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            return (
              <Link
                key={item.link}
                href={localeData.href}
                className={`bg-brand-primary px-6 py-3 text-base font-medium text-white transition hover:opacity-90 whitespace-nowrap ${
                  isScrolled ? "scale-100" : ""
                }`}
              >
                {localeData.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
