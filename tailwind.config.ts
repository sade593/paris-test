import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        editorial: "1fr 1fr 1fr 340px",
        hero: "1fr 480px",
        "article-layout": "1fr minmax(0, 720px) 1fr",
      },
    },
  },
  plugins: [],
};

export default config;
