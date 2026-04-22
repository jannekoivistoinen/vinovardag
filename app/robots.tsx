import type { MetadataRoute } from "next";
import { COMPANY_METADATA } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "DuckDuckBot",
    "Amazonbot",
    "Meta-ExternalAgent",
    "FacebookBot",
    "facebookexternalhit",
    "CCBot",
    "Bytespider",
    "cohere-ai",
    "YouBot",
    "DiffbotBot",
    "MistralAI-User",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: COMPANY_METADATA.sitemapUrl,
    host: COMPANY_METADATA.url,
  };
}
