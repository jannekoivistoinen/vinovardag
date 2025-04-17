import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  redirects: async () => [
    {
      source: "/en/winter-activities",
      destination: "/en/activities/winter",
      permanent: true,
    },
    {
      source: "/en/saloon-and-sauna",
      destination: "/en/activities/sauna-ice-swimming",
      permanent: true,
    },
    {
      source: "/en/contact",
      destination: "/en/info/contact",
      permanent: true,
    },
    {
      source: "/en/accommodation",
      destination: "/en",
      permanent: true,
    },
    {
      source: "/en/home-old",
      destination: "/en",
      permanent: true,
    },
    {
      source: "/fi/home-old",
      destination: "/fi",
      permanent: true,
    },
    {
      source: "/fi/about-us",
      destination: "/fi/lucky-ranch/meista",
      permanent: true,
    },
    {
      source: "/en/about-us",
      destination: "/en/ranch/about-us",
      permanent: true,
    },
    {
      source: "/fi/winter-activities",
      destination: "/fi/aktiviteetit/talvi",
      permanent: true,
    },
    {
      source: "/en/activities",
      destination: "/en",
      permanent: true,
    },
    {
      source: "/fi/aktiviteetit",
      destination: "/fi",
      permanent: true,
    },
    {
      source: "/fi/western-riding",
      destination: "/fi/aktiviteetit/hevoset-talvi",
      permanent: true,
    },
    {
      source: "/fi/summer-activities",
      destination: "/fi/aktiviteetit/kesa",
      permanent: true,
    },
    {
      source: "/fi/summer-activity-center",
      destination: "/fi",
      permanent: true,
    },
    {
      source: "/fi/majoitus",
      destination: "/fi",
      permanent: true,
    },
    {
      source: "/en/summer-activities",
      destination: "/en/activities/summer",
      permanent: true,
    },
  ],
};

export default withNextIntl(config);
