/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'xl': '0.75rem',
      },
      width: {
        '6rem': '6rem',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // ...
    '@tailwindcss/helpers': true,
  },
}

