import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E6',
          100: '#F5EAC7',
          200: '#EBD58F',
          300: '#E1C057',
          400: '#D4AF37',
          500: '#B8962A',
          600: '#9A7D23',
          700: '#7C641C',
          800: '#5E4B15',
          900: '#40320E',
        },
        navy: {
          DEFAULT: '#1A2F3D',
          50: '#E8ECF0',
          100: '#C6D0D9',
          200: '#8DA1B3',
          300: '#54728D',
          400: '#2A4A61',
          500: '#1A2F3D',
          600: '#152735',
          700: '#111F2A',
          800: '#0C1720',
          900: '#070F15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
