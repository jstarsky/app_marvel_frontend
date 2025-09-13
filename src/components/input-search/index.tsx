import { useTranslation } from "react-i18next";
import type { InputSearchProps } from "./types";
export default function InputSearch({
  ref,
  type = "text",
  className,
  loading = false,
  result,
  ...props
}: InputSearchProps) {
  const { t } = useTranslation();
  return (
    <div>
      <label
        className={[
          "flex",
          "items-center",
          "gap-2",
          "border-b-2",
          "border-b-black",
          "has-focus-within:!border-b-primary",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="marvel-search mb-2" />
        <input
          ref={ref}
          type={type}
          {...props}
          className={[
            "mb-2",
            "font-roboto",
            "text-md",
            "peer",
            "block w-full",
            "uppercase",
            "[appearance:textfield]",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[&::-webkit-inner-spin-button]:appearance-none",
            "placeholder:!text-placeholder",
            "placeholder:!uppercase",
            "disabled:placeholder:!text-disabled",
            "placeholder:!font-marvel",
            "!appearance-none focus:!outline-none",
            "focus:!outline-none",
            "focus:!ring-0",
            "bg-transparent",
            "disabled:!text-disabled",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </label>
      <div className="pt-2">
        {loading ? (
          <span className="tracking-tighter font-normal text-xs text-black font-roboto uppercase">{t("loading")}</span>
        ) : (
          <span className="tracking-tighter font-normal text-xs text-black font-roboto-mono uppercase">{t("search_results", { result: result })}</span>
        )}
      </div>
    </div>
  );
}
