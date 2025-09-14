import type { LabelProps } from "./types.js";

export function Label({
  label,
  required,
  className,
  variable = "black",
}: LabelProps) {
  return label ? (
    <div
      className={[
        "font-roboto-condensed",
        "text-md",
        "uppercase",
        "flex",
        "!flex-col",
        "justify-center",
        "w-full",
        "truncate",
        "group-has-[:disabled]:!text-disabled",
        "data-[variable=primary]:!text-primary",
        "data-[variable=white]:!text-white",
        "data-[variable=black]:!text-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variable={variable}
    >
      <p className="inline-block align-middle">
        {label}
        {typeof required === "object" && required?.message && (
          <span className="ml-1 !italic !text-outline">
            ({required.message})
          </span>
        )}
      </p>
    </div>
  ) : (
    <></>
  );
}
