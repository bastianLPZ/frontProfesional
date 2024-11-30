/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: '#35682d',  // Aquí añades el color personalizado
          secondary: '#2a4a1e',
          terciary: '#4a7a3d'
        },
    },
  },
  plugins: [],
}

