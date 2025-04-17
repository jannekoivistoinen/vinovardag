"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COMPANY_METADATA } from "@/lib/constants";
import Logo from "@/components/Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { SCROLL_THRESHOLD } from "./utils";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );
  const locale = useLocale();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    }

    return () => {
      document.documentElement.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setOpenPopover(null);
  }, [pathname]);

  const toggleMobileSubmenu = (itemName: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === itemName ? null : itemName);
  };

  return (
    <div
      className={`sticky z-[9999] top-0 w-full duration-300 ${
        mobileMenuOpen
          ? "bg-white bg-opacity-100"
          : isScrolled
          ? "bg-white bg-opacity-85 backdrop-blur-xl "
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Global"
        className={`relative z-[9999] mx-auto flex xl:flex-none xl:grid xl:grid-cols-[200px_1fr_200px] items-center justify-between duration-300 pl-2 ${
          isScrolled ? "py-3 xl:py-3" : "py-3 xl:py-3"
        }`}
      >
        <div className="flex relative z-[10000]">
          <Link
            href="/"
            className={`px-1 xl:px-2 transition hover:opacity-50 ${
              isScrolled ? "scale-[80%]" : "scale-[80%]"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">{COMPANY_METADATA.name}</span>
            <Logo />
          </Link>
        </div>
        <div className="mr-6 flex xl:hidden relative z-[10000]">
          <Button
            className="group scale-125"
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="pointer-events-none"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </div>

        <DesktopNavigation
          pathname={pathname}
          locale={locale}
          isScrolled={isScrolled}
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        />

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileNavigation
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              openMobileSubmenu={openMobileSubmenu}
              toggleMobileSubmenu={toggleMobileSubmenu}
              pathname={pathname}
              locale={locale}
              router={router}
            />
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
