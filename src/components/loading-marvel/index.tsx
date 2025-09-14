"use client";

export default function LoadingMarvel({
  loading = false,
  variant = "fullscreen",
}: {
  loading?: boolean;
  variant?: "fullscreen" | "container" | "inline";
  size?: "small" | "medium" | "large";
}) {
  if (!loading) {
    return null;
  }

  return (
    <div
      className={[
        "data-[variant=fullscreen]:fixed data-[variant=fullscreen]:inset-0",
        "data-[variant=container]:absolute data-[variant=container]:inset-0",
        "flex justify-center items-center bg-black/80 z-[9999]",
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="flex flex-col items-center text-[clamp(1.5rem,6vw,3.5rem)] marvel-marvel-logo-text text-center text-shimmer"
          aria-hidden
        >
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
        </span>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
