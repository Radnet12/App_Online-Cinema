import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import cn from "classnames";

import { Icon } from "@/ui";

import { MenuItemType } from "./MenuItem.type";

import styles from "../MenuBlock/MenuBlock.module.scss";

export const MenuItem: FC<{ item: MenuItemType }> = (props) => {
  // **Props
  const { item } = props;
  const { asPath } = useRouter();

  return (
    <li
      className={cn({
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
