import { FC } from "react";

import { Movies } from "./Movies/Movies";
import { Search } from "./Search/Search";

import styles from "./Sidebar.module.scss";

export const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <Movies />
    </div>
  );
};
