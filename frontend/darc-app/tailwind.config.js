/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta institucional DARC
        darcBlue: "#0F172A",     // Azul principal
        darcGreen: "#16A34A",    // Verde institucional
        darcLightBlue: "#1E3A8A",// Azul secundario
        darcGray: "#F3F4F6",     // Fondo claro
        darcAccent: "#3B82F6",   // Azul de acento
        darcText: "#1F2937",     // Texto oscuro
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
