import { FC } from "react";

import cn from "classnames";
import { useFormContext } from "react-hook-form";

import { IInput } from "./Input.interface";

import styles from "./Input.module.scss";

export const Input: FC<IInput> = (props) => {
  // **Props
  const { style, label = "", type = "text", name, rules, ...rest } = props;

  // Form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={cn(styles.common, styles.field)} style={style}>
      <label>
        <span>{label}</span>
        <input {...register(name, rules)} type={type} {...rest} />
      </label>
      {errors[name] && (
        <div className={styles.error}>{errors[name]?.message}</div>
      )}
    </div>
  );
};
