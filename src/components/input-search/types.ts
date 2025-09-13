import { InputHTMLAttributes } from "react";

export interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
result?: number;
loading?: boolean;
}
