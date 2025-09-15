import { InputHTMLAttributes } from "react";
import { CaptionProps } from "../input-wrapper";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "search"
  | "tel"
  | "url";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "required" | "type"> {
  type?: InputType;
  label?: string;
  required?: boolean | CaptionProps;
  caption?: CaptionProps;
  htmlFor?: string;
  requiredMessage?: string;
  variable?: "primary" | "white" | "black";
  "data-font-nums"?: "true" | "false";
  "data-testid"?: string;
}
