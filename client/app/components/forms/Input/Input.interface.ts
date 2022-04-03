import { InputHTMLAttributes } from "react";

import { RegisterOptions } from "react-hook-form";

interface IInputProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

type DefaultInputPropsType = InputHTMLAttributes<HTMLInputElement> &
  IInputProps;

export interface IInput extends DefaultInputPropsType {}
