import { HTMLAttributes, LabelHTMLAttributes, Ref, RefObject } from "react";

export type CaptionType =
  | "none"
  | "info"
  | "required"
  | "maxLength"
  | "minLength"
  | "max"
  | "min"
  | "pattern"
  | "validate"
  | "error"
  | "warning"
  | "success";

export interface Caption {
  value?: boolean;
  message?: string;
  type?: CaptionType;
}

export interface LabelProps {
  label?: string;
  className?: string;
  required?: boolean | Caption;
  variable?: "primary" | "white" | "black";
}

export interface CaptionProps extends HTMLAttributes<HTMLDivElement>, Caption {
  ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement>;
  variable?: "primary" | "white" | "black";
}

export interface InputWrapperProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "ref" | "required">,
    LabelProps {
  ref?: RefObject<HTMLLabelElement> | Ref<HTMLLabelElement>;
  caption?: CaptionProps;
  requiredMessage?: string;
  variable?: "primary" | "white" | "black";
}
