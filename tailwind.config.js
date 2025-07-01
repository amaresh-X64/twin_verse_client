/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ⬅️ tells Tailwind to scan these files
  ],
  theme: {
    extend: {
      colors: {
        walmartBlue: '#0071dc',
        walmartYellow: '#ffc220',
        lightGray: '#f3f4f6',
      },
    },
  },
  plugins: [],
}
