import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3B3B3B",
        secondary: "#EEEEEE",
        "stroke-tertiary": "#EFEDF3",
        "gray-medium": "#3B3B3B",
        "stroke-secondary": "#8F8F8F",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;
