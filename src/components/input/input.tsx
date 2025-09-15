import { useId } from "react";
import { InputWrapper } from "@/components";
import { InputProps } from "./types";

export function Input({
  id: propsId,
  label,
  caption,
  required,
  htmlFor,
  disabled,
  requiredMessage,
  className,
  variable = "black",
  "data-font-nums": dataFontNums = "false",
  "data-testid": dataTestId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = propsId ?? generatedId;
  return (
    <InputWrapper
      label={label}
      caption={caption}
      required={required}
      htmlFor={htmlFor}
      requiredMessage={requiredMessage}
      className={className}
      variable={variable}
    >
      <input
        id={id}
        {...props}
        disabled={disabled}
        required={typeof required === "object" ? required?.value : required}
        className={[
          "font-roboto-condensed",
          "text-md",
          "peer",
          "block w-full",
          "[appearance:textfield]",
          "[&::-webkit-outer-spin-button]:appearance-none",
          "[&::-webkit-inner-spin-button]:appearance-none",
          "placeholder:!text-placeholder",
          "disabled:placeholder:!text-disabled",
          "placeholder:!font-marvel",
          "selection:data-[variable=primary]:!!bg-primary/30",
          "selection:data-[variable=white]:!bg-white/30",
          "selection:data-[variable=black]:!bg-black/30",
          "!appearance-none focus:!outline-none",
          "focus:!outline-none",
          "focus:!ring-0",
          "bg-transparent",
          "disabled:!text-disabled",
          "data-[variable=primary]:!text-primary",
          "data-[variable=white]:!text-white",
          "data-[variable=black]:!text-black",
          props.type === "number" && "font-roboto-mono tabular-nums",
          "data-[font-nums=true]:!font-roboto-mono data-[font-nums=true]:tabular-nums",
        ]
          .filter(Boolean)
          .join(" ")}
        data-variable={variable}
        data-font-nums={dataFontNums}
        data-disabled={disabled ? "true" : "false"}
        data-testid={dataTestId}
      />
    </InputWrapper>
  );
}
