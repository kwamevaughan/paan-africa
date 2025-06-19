/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "paan-yellow": "#F2B706",
        "paan-blue": "#84C1D9",
        "paan-dark-blue": "#172840",
        "paan-red": "#F25849",
      },
      screens: {
        "lg-custom": "1200px", // Custom breakpoint at 1210px
      },
    },
  },
  plugins: [],
};