"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Add input class constants
const INPUT_STYLES = {
  base: "w-full bg-white text-zinc-950 px-4 py-3 placeholder:text-zinc-400 focus:ring-4",
  error: "border-red-600 ring-red-100 focus:border-red-600 ",
  normal: "ring-zinc-100 focus:border-zinc-600",
  select:
    "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%227%22%20height%3D%2212%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.5%2012a.498.498%200%200%201-.353-.146l-3-3a.5.5%200%201%201%20.707-.708L3.5%2010.794l2.647-2.647a.5.5%200%201%201%20.707.707l-3%203A.499.499%200%200%201%203.5%2012Zm0-12c.128%200%20.256.049.354.146l3%203a.5.5%200%201%201-.707.708L3.5%201.206.854%203.853a.5.5%200%201%201-.708-.707l3-3A.499.499%200%200%201%203.5%200Z%22%20fill%3D%22%23000%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px] bg-[right_1.25rem_center] bg-no-repeat",
};

const getInputClassName = (error?: boolean, isSelect?: boolean) => {
  return `${INPUT_STYLES.base} ${
    error ? INPUT_STYLES.error : INPUT_STYLES.normal
  } ${isSelect ? INPUT_STYLES.select : ""}`;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  botcheck: string;
};

// Component to handle the part using useSearchParams
const ContactFormContent = () => {
  const t = useTranslations("component.contactForm");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const [message, setMessage] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const apiKey = process.env.PUBLIC_ACCESS_KEY || "";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Lucky Ranch",
      subject: "New inquiry from Lucky Ranch",
    },
    onSuccess: () => {
      reset();
      setShowError(false);
      const isSwedish = pathname.startsWith("/sv");
      const thankYouPath = isSwedish
        ? "/sv/info/kontakt/tack"
        : "/en/info/contact/thank-you";
      router.push(thankYouPath);
    },
    onError: (msg) => {
      setShowError(true);
      setMessage(msg);
    },
  });

  useEffect(() => {
    // Check if we're on the contact page and there's a hash
    if (pathname === "/contact" && window.location.hash === "#inquiry-form") {
      const element = document.getElementById("inquiry-form");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname, searchParams]);

  return (
    <>
      <form
        id="inquiry-form"
        className="scroll-mt-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="checkbox"
          id=""
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        ></input>

        <div className="mb-5 flex gap-4">
          <div className="w-1/2">
            <input
              type="text"
              placeholder={t("placeholders.firstName")}
              autoComplete="given-name"
              className={getInputClassName(!!errors.firstName)}
              {...register("firstName", {
                required: t("validation.firstNameRequired"),
                maxLength: 80,
              })}
            />
            {errors.firstName && (
              <div className="mt-1 text-red-600">
                <small>{errors.firstName.message?.toString()}</small>
              </div>
            )}
          </div>
          <div className="w-1/2">
            <input
              type="text"
              placeholder={t("placeholders.lastName")}
              autoComplete="family-name"
              className={getInputClassName(!!errors.lastName)}
              {...register("lastName", {
                required: t("validation.lastNameRequired"),
                maxLength: 80,
              })}
            />
            {errors.lastName && (
              <div className="mt-1 text-red-600">
                <small>{errors.lastName.message?.toString()}</small>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <input
            id="email_address"
            type="email"
            placeholder={t("placeholders.email")}
            autoComplete="false"
            className={getInputClassName(!!errors.email)}
            {...register("email", {
              required: t("validation.emailRequired"),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t("validation.emailInvalid"),
              },
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-600">
              <small>{errors.email.message?.toString()}</small>
            </div>
          )}
        </div>

        <div className="mb-5">
          <input
            type="tel"
            placeholder={t("placeholders.phone")}
            autoComplete="tel"
            className={getInputClassName(!!errors.phone)}
            {...register("phone", {
              required: t("validation.phoneRequired"),
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: t("validation.phoneInvalid"),
              },
            })}
          />
          {errors.phone && (
            <div className="mt-1 text-red-600">
              <small>{errors.phone.message?.toString()}</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <textarea
            placeholder={t("placeholders.message")}
            className={`h-36 ${getInputClassName(!!errors.message)}`}
            {...register("message", {
              required: t("validation.messageRequired"),
            })}
          />
          {errors.message && (
            <div className="mt-1 text-red-600">
              <small>{errors.message.message?.toString()}</small>
            </div>
          )}
        </div>

        <Button type="submit" size="lg" className="mt-8 mx-auto">
          {isSubmitting ? (
            <svg
              className="mx-auto h-5 w-5 animate-spin text-white dark:text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <span className="inline-flex items-center">
              {t("submitButton")}
            </span>
          )}
        </Button>
      </form>

      {showError && (
        <div className="mt-3 text-center text-sm text-red-500">
          {message || t("errorMessage")}
        </div>
      )}
    </>
  );
};

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
