import Header from "@/components/header";
import { LayoutProps } from "./types";

export default function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Header />
      <div
        className={["grow min-h-0", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
