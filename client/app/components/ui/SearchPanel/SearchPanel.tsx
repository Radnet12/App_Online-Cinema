import { FC } from "react";

import { Icon } from "../Icon/Icon";

import { ISearchPanel } from "./SearchPanel.interface";

import styles from "./SearchPanel.module.scss";

export const SearchPanel: FC<ISearchPanel> = (props) => {
  // **Props
  const { inputHandler, searchTerm } = props;

  return (
    <div className={styles.search}>
      <Icon icon="MdSearch" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onInput={inputHandler}
      />
    </div>
  );
};
