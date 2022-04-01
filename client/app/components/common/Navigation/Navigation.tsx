import { FC } from "react";

import { Logo } from "@/ui";

import { Menu } from "./Menu/Menu";

import styles from "./Navigation.module.scss";

export const Navigation: FC = () => {
  return (
    <div className={styles.navigation}>
      <Logo />
      <Menu />
    </div>
  );
};
