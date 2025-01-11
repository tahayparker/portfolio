import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sidebar': '1400px',
      },
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          dark: '#000707',
          light: '#eeedf0'
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          dark: '#20C20E',
          light: '#012456'
        }
      },
      fontFamily: {
        mono: ['var(--font-dm-mono)'],
        'uni': ['uni_05_53', 'monospace'],
      },
      boxShadow: {
        'custom': '5px 5px 0px -2px var(--background), 5px 5px 0px 0px var(--foreground)'
      }
    },
  },
  plugins: [],
};

export default config;
