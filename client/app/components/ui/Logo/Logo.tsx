import { FC } from "react";

import Image from "next/image";
import Link from "next/link";


export const Logo: FC = () => {
  return (
    <Link href="/">
      <a className="px-layout mb-10 block">
        <Image
          src="/ui/logo.svg"
          width={247}
          height={34}
          alt="Online cinema"
          draggable={false}
        />
      </a>
    </Link>
  );
};
