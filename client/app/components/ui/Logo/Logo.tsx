import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import logoImage from "@/assets/img/ui/logo.svg";

export const Logo: FC = () => {
  return (
    <Link href="/">
      <a className="px-layout mb-10 block">
        <Image
          src={logoImage}
          width={247}
          height={34}
          alt="Online cinema"
          draggable={false}
        />
      </a>
    </Link>
  );
};
