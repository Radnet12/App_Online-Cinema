import { FC } from "react";

import cn from "classnames";

import { IFormButton } from "./FormButton.interface";

import styles from "./FormButton.module.scss";

export const FormButton: FC<IFormButton> = (props) => {
  // **Props
  const { className, children, ...rest } = props;

  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
