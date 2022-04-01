import { FC } from "react";

import { AuthMenuItem } from "../AuthMenuItem/AuthMenuItem";
import { MenuItem } from "../MenuItem/MenuItem";

import { MenuBlockType } from "./MenuBlock.type";

import styles from "./MenuBlock.module.scss";

export const MenuBlock: FC<{ menu: MenuBlockType }> = (props) => {
  // **Props
  const { menu } = props;

  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{menu.title}</div>
      <ul className={styles.list}>
        {menu.items.map((item) => (
          <MenuItem key={item.link} item={item} />
        ))}
        {menu.title === "General" && <AuthMenuItem />}
      </ul>
    </div>
  );
};
