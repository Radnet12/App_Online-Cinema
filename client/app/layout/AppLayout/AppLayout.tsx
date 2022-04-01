import { FC } from "react";

import { Navigation, Sidebar } from "@/common";

import styles from "./AppLayout.module.scss";

export const AppLayout: FC = (props) => {
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
