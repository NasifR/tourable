/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': ['"Red Hat Display"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

