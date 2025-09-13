import { Caption } from "./caption";
import { Label } from "./label";
import type { InputWrapperProps } from "./types";

export function InputWrapper({
  ref,
  label,
  required,
  caption,
  children,
  htmlFor,
  className,
  variable = "black",
  requiredMessage,
  ...props
}: InputWrapperProps) {

  return (
    <label
      ref={ref}
      className={["group flex flex-col gap-1", className]
        .filter(Boolean)
        .join(" ")}
      htmlFor={htmlFor}
      {...props}
    >
      <Label
        label={label}
        variable={variable}
        required={
          requiredMessage ? { value: true, message: requiredMessage } : required
        }
      />
      <div
        className={[
          "peer",
          "grow",
          "!bg-transparent",
          "py-2",
          "px-2",
          "border-b",
          "border-b-2",
          "data-[variable=primary]:border-b-primary",
          "data-[variable=white]:border-b-white",
          "data-[variable=black]:border-b-black",
          "has-[:disabled]:border-b-disabled",
          "group-focus-within:!border-b-primary",
          "data-[caption-type=none]:!border-b-outline",
          "data-[caption-type=required]:!border-b-error",
          "data-[caption-type=maxLength]:!border-b-error",
          "data-[caption-type=minLength]:!border-b-error",
          "data-[caption-type=max]:!border-b-error",
          "data-[caption-type=min]:!border-b-error",
          "data-[caption-type=pattern]:!border-b-error",
          "data-[caption-type=validate]:!border-b-error",
          "data-[caption-type=error]:!border-b-error",
          "data-[caption-type=warning]:!border-b-warning",
          "data-[caption-type=success]:!border-b-success",
        ]
          .filter(Boolean)
          .join(" ")}
        data-variable={variable}
        data-caption-type={caption?.type || "none"}
        data-caption-value={caption?.value === true ? "true" : "false"}
      >
        {children}
      </div>
      <Caption variable={variable} {...caption} />
    </label>
  );
}
