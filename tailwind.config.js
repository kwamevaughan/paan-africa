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
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(16px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-16px)' },
        },
        float4: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(16px)' },
        },
        float5: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-12px) translateX(12px)' },
        },
      },
      animation: {
        'float1': 'float1 3s ease-in-out infinite',
        'float2': 'float2 4s ease-in-out infinite',
        'float3': 'float3 3.5s ease-in-out infinite',
        'float4': 'float4 4.5s ease-in-out infinite',
        'float5': 'float5 5s ease-in-out infinite',
        'float1-delay': 'float1 3s ease-in-out infinite 0.5s',
        'float2-delay': 'float2 4s ease-in-out infinite 1s',
        'float3-delay': 'float3 3.5s ease-in-out infinite 1.5s',
        'float4-delay': 'float4 4.5s ease-in-out infinite 2s',
        'float5-delay': 'float5 5s ease-in-out infinite 2.5s',
      },
    },
  },
  plugins: [],
};