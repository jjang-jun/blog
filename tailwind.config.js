/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4fe',
          100: '#d9e6fd',
          200: '#b8d1fb',
          300: '#89b4f7',
          400: '#6a9cf5',
          500: '#4683f1',
          600: '#2e6bdb',
          700: '#2356b8',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            'pre': false,
            'code': false,
            'pre code': false,
            'code::before': false,
            'code::after': false,
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
