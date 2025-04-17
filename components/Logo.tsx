import Image from "next/image";
import { COMPANY_METADATA } from "@/lib/constants";
import CompanyLogo from "@/app/assets/Logo.png";

export default function Logo() {
  return (
    <Image
      src={CompanyLogo}
      alt={`${COMPANY_METADATA.name} logo`}
      width={95}
      height={95}
      className="mix-blend-multiply"
      priority
    />
  );
}
