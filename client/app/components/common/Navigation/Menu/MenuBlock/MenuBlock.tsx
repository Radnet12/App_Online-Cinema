import { FC } from "react";

import { Loader } from "@/ui";

import { AuthMenuItem } from "../AuthMenuItem/AuthMenuItem";
import { MenuItem } from "../MenuItem/MenuItem";

import { IMenuBlockProps } from "./MenuBlock.type";

import styles from "../Menu.module.scss";

export const MenuBlock: FC<IMenuBlockProps> = (props) => {
  // **Props
  const { menu, count, isLoading = false } = props;

  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{menu.title}</div>
      <ul className={styles.list}>
        {isLoading ? (
          <div className="mx-11 mb-6">
            <Loader count={count} className="h-6 mt-6" />
          </div>
        ) : (
          menu.items.map((item) => <MenuItem key={item.link} item={item} />)
        )}
        {menu.title === "General" && <AuthMenuItem />}
      </ul>
    </div>
  );
};
