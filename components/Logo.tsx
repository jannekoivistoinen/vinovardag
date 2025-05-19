import Image from "next/image";
import { COMPANY_METADATA } from "@/lib/constants";
import CompanyLogo from "@/app/assets/Logo.svg";

export default function Logo() {
  return (
    <Image
      src={CompanyLogo}
      alt={`${COMPANY_METADATA.name} logo`}
      priority
      className="object-contain w-44 md:w-64 lg:w-64 h-auto"
    />
  );
}
