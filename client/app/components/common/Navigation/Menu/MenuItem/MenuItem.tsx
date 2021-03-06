import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { Icon } from "@/ui";

import { IMenuItem } from "./MenuItem.interface";

import styles from "../Menu.module.scss";

export const MenuItem: FC<{ item: IMenuItem }> = (props) => {
  // **Props
  const { item } = props;
  const { asPath } = useRouter();

  return (
    <li
      className={clsx({
        [styles.active]: asPath === item.link,
      })}
    >
      <Link href={item.link}>
        <a>
          <Icon icon={item.icon} />
          <span>{item.title}</span>
        </a>
      </Link>
    </li>
  );
};
