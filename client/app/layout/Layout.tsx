import { FC } from "react";

import styles from "./Layout.module.scss";
import { Navigation } from "./Navigation/Navigation";
import { Sidebar } from "./Sidebar/Sidebar";

export const Layout: FC = (props) => {
  // **Props
  const { children } = props;

  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.center}>{children}</div>
      <Sidebar />
    </div>
  );
};
