import { InputHTMLAttributes, Ref } from "react";

export interface InputSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  result?: number;
  loading?: boolean;
  'data-testid'?: string;
}
