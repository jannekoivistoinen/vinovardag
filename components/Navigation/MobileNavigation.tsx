import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NAVIGATION_LINKS,
  NAVIGATION_CTA,
  locales,
  SITE_CONFIG,
} from "@/lib/constants";
import { images, navigationIcons } from "@/app/assets/images";
import { NavigationItem } from "./types";
import {
  mobileLinkStyles,
  mobileLinkStylesActive,
  mobileDescriptionStyles,
  mobileSubmenuLinkStyles,
  mobileSubmenuLinkStylesActive,
} from "./styles";
import {
  getLocaleData,
  isActive,
  handleLanguageChange,
  localeNames,
} from "./utils";
import {
  containerVariants,
  itemVariants,
  bottomElementsVariants,
} from "./animations";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type MobileNavigationProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  openMobileSubmenu: string | null;
  toggleMobileSubmenu: (itemName: string) => void;
  pathname: string;
  locale: string;
  router: AppRouterInstance;
};

export default function MobileNavigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  openMobileSubmenu,
  toggleMobileSubmenu,
  pathname,
  locale,
  router,
}: MobileNavigationProps) {
  // Add ESC key handler to close mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleEscKey);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9990] h-[100vh] bg-brand-light/95 pt-[110px] opacity-50 xl:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={() => setMobileMenuOpen(false)}
      />
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 right-0 z-[9991] h-[95vh] w-full overflow-hidden rounded-bl-2xl rounded-br-2xl bg-white pt-[110px] backdrop-blur-3xl xl:hidden"
      >
        <div className="h-full overflow-y-auto px-6 pb-20">
          <div className="mt-6 flow-root mb-16">
            <div className="-my-6">
              <motion.div
                className="space-y-3 pt-6 pb-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {NAVIGATION_LINKS.map((item: NavigationItem) => {
                  const localeData = getLocaleData(item, locale);
                  const active = isActive(localeData.href, pathname);

                  if (item.sublinks) {
                    const isSubmenuOpen = openMobileSubmenu === item.link;
                    return (
                      <motion.div
                        key={item.link}
                        className="space-y-2"
                        variants={itemVariants}
                      >
                        <button
                          onClick={() => toggleMobileSubmenu(item.link)}
                          className={`${mobileLinkStyles} w-full flex items-center justify-between ${
                            active ? mobileLinkStylesActive : ""
                          }`}
                        >
                          {localeData.name}
                          <motion.div
                            animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isSubmenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <motion.div
                                className="mb-8"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                {item.sublinks?.map((sublink) => {
                                  const sublinkLocaleData = getLocaleData(
                                    sublink,
                                    locale
                                  );
                                  return (
                                    <Link
                                      key={sublink.link}
                                      href={sublinkLocaleData.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`${mobileSubmenuLinkStyles} flex items-center gap-5 ${
                                        isActive(
                                          sublinkLocaleData.href,
                                          pathname
                                        )
                                          ? mobileSubmenuLinkStylesActive
                                          : ""
                                      }`}
                                    >
                                      <div className="flex items-center gap-5">
                                        {sublink.icon &&
                                          (sublink.icon in navigationIcons ? (
                                            <FontAwesomeIcon
                                              icon={
                                                navigationIcons[
                                                  sublink.icon as keyof typeof navigationIcons
                                                ]
                                              }
                                              className="h-6 w-6 text-brand-dark"
                                            />
                                          ) : (
                                            <Image
                                              src={
                                                images[
                                                  sublink.icon as keyof typeof images
                                                ]
                                              }
                                              alt=""
                                              className="h-6 w-6 object-contain"
                                              width={16}
                                              height={16}
                                            />
                                          ))}
                                        <div className="group">
                                          <span className="text-[15px] font-semibold text-[#141414] group-hover:text-brand-dark">
                                            {sublinkLocaleData.name}
                                          </span>
                                          {sublinkLocaleData.description && (
                                            <p
                                              className={
                                                mobileDescriptionStyles
                                              }
                                            >
                                              {sublinkLocaleData.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.link}
                      className="space-y-2"
                      variants={itemVariants}
                    >
                      <Link
                        href={localeData.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`${mobileLinkStyles} ${
                          active ? mobileLinkStylesActive : ""
                        }`}
                      >
                        <div>
                          <span>{localeData.name}</span>
                          {localeData.description && (
                            <p className={mobileDescriptionStyles}>
                              {localeData.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-6 mb-20">
            {/* Language Switcher */}
            {SITE_CONFIG.i18n.languageSwitcher.showOnMobile && (
              <motion.div
                className="flex items-center gap-4"
                variants={bottomElementsVariants}
                initial="hidden"
                animate="visible"
                custom={0.8}
              >
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      handleLanguageChange(loc, router, pathname);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 py-2 px-4 rounded-md transition ${
                      locale === loc
                        ? "bg-[#F1F1F0] text-brand-dark"
                        : "text-gray-600 hover:bg-[#F1F1F0]"
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">{localeNames[loc]}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-3"
              variants={bottomElementsVariants}
              initial="hidden"
              animate="visible"
              custom={0.9}
            >
              {NAVIGATION_CTA.map((item: NavigationItem) => {
                const localeData = getLocaleData(item, locale);
                return (
                  <Link
                    key={item.link}
                    href={localeData.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-brand-primary w-full py-4 text-center text-base font-medium text-white transition hover:opacity-90"
                  >
                    {localeData.name}
                  </Link>
                );
              })}
            </motion.div>
          </div>
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y < -50 || velocity.y < -500) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-[9992] bg-white cursor-grab active:cursor-grabbing"
            key="drag-handle"
          >
            <div className="flex h-8 w-full items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-brand-dark" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
