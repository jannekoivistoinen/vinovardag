"use client";

import dynamic from "next/dynamic";

export const Slider = dynamic(
  () => import("@/components/Slider").then((m) => m.Slider),
  {
    ssr: false,
    loading: () => <div className="opacity-0" />,
  }
);
