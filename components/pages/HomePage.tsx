"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { locale } = useParams();

  useEffect(() => {
    console.log("Current locale:", locale);
  }, [locale]);

  return (
    <>
      <div>Hello world</div>
    </>
  );
}
