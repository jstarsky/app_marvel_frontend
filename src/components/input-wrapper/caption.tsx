import type { CaptionProps } from "./types.js";

export function Caption({
  ref,
  type = "info",
  message,
  className,
  value,
  variable = "black",
  ...props
}: CaptionProps) {
  if (value === undefined || value === null || value === false) {
    return <></>;
  }
  return type ? (
    <div
      ref={ref}
      className={[
        "font-roboto",
        "text-sm",
        "flex flex-col justify-center w-full truncate",
        "group-has-[:disabled]:!text-disabled",
        "data-[caption-type=info]:data-[variable=black]:text-black",
        "data-[caption-type=info]:data-[variable=white]:text-white",
        "data-[caption-type=info]:data-[variable=primary]:text-primary",
        "data-[caption-type=required]:text-error",
        "data-[caption-type=maxLength]:text-error",
        "data-[caption-type=minLength]:text-error",
        "data-[caption-type=max]:text-error",
        "data-[caption-type=min]:text-error",
        "data-[caption-type=pattern]:text-error",
        "data-[caption-type=validate]:text-error",
        "data-[caption-type=error]:text-error",
        "data-[caption-type=warning]:text-warning",
        "data-[caption-type=success]:text-success",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
      data-variable={variable}
      data-caption-type={type}
      data-caption-value={typeof value === "boolean" ? `${value}` : value}
    >
      {message && <p className="inline-block align-middle">{message}</p>}
    </div>
  ) : (
    <></>
  );
}
