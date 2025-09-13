import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Marvel App",
  description: "Marvel characters and comics frontend app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
