/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        portal: {
          light: "#97CE4C", // Portal Green
          DEFAULT: "#81C784", // Glow Green
          dark: "#4C8235", // Deep Portal Green
        },
        cosmic: {
          light: "#673AB7", // Cosmic Purple
          DEFAULT: "#9575CD", // Galactic Purple
          dark: "#4527A0", // Deep Cosmic Purple
        },
        interdimensional: {
          light: "#FFD700", // Bright Gold
          DEFAULT: "#FFC107", // Gold Glow
          dark: "#D4AF37", // Dim Interdimensional Gold
        },
        background: {
          light: "#F3F4F6", // Light Cosmic Gray
          DEFAULT: "#1A1A2E", // Deep Space Navy
          dark: "#121212", // Dark Void
        },
        surface: {
          light: "#FFFFFF",
          DEFAULT: "#2A2A3E",
          dark: "#1E1E32",
          border: {
            light: "#E2E8F0",
            dark: "#303050",
          },
        },
        text: {
          light: "#212121", // Charcoal Black
          dark: "#E0E0E0", // Light Gray
        },
      },
    },
  },
  plugins: [],
};
