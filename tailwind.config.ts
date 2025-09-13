import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        marvel: ["Marvel", "sans-serif"],
      },
    },
  },
} satisfies Config;
