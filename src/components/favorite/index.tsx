import { useTransition } from "react";
import { FavoriteProps } from "./types";
import { useTranslation } from "react-i18next";

export default function Favorite({
  size = "small",
  amount,
  isActive = false,
  className,
  onClick,
  onLogout,
  ...props
}: FavoriteProps) {
  const { t } = useTranslation();
  return (
    <div
      {...props}
      className={[
        className,
        "flex items-center",
        onLogout !== undefined || amount !== undefined ? "gap-2" : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {onLogout !== undefined && (
        <span
          className={[
            "pr-4",
            "capitalize",
            "font-marvel font-semibold cursor-pointer",
            "text-white",
            "data-[size=small]:text-[0.75rem]",
            "data-[size=medium]:text-[1.125rem]",
          ]
            .filter(Boolean)
            .join(" ")}
          data-size={size}
          onClick={onLogout}
        >
          {t("logout")}
        </span>
      )}
      <span
        className={[
          "cursor-pointer",
          isActive ? "marvel-favourite" : "marvel-favourite-outline",
          "data-[isactive=true]:text-primary",
          "data-[isactive=false]:text-white",
          "data-[size=small]:text-[0.75rem]",
          "data-[size=medium]:text-[1.125rem]",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onClick}
        data-isactive={isActive ? "true" : "false"}
        data-size={size}
      />
      {amount !== undefined ? (
        <span
          className={[
            "font-roboto-mono font-normal",
            "text-white",
            "data-[size=small]:text-[0.75rem]",
            "data-[size=medium]:text-[1.125rem]",
          ]
            .filter(Boolean)
            .join(" ")}
          data-size={size}
        >
          {amount}
        </span>
      ) : null}
    </div>
  );
}
