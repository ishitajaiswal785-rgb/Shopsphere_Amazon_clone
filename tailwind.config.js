/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "primary-container": "#131921",
        "primary-nav": "#232F3E",
        "on-primary": "#ffffff",
        "primary-fixed": "#dde3ee",
        "primary-fixed-dim": "#c1c7d2",
        "on-primary-fixed": "#161c24",
        "on-primary-fixed-variant": "#414750",
        "on-primary-container": "#7e848e",
        
        "secondary": "#8a5100",
        "secondary-container": "#fe9800",
        "secondary-amber": "#FFD814",
        "secondary-orange": "#FFA41C",
        "secondary-hover": "#F7CA00",
        "secondary-orange-hover": "#FA8900",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#643900",
        "secondary-fixed": "#ffdcbd",
        "secondary-fixed-dim": "#ffb86f",
        "on-secondary-fixed": "#2c1600",
        "on-secondary-fixed-variant": "#693c00",

        "tertiary": "#6f5d00",
        "tertiary-container": "#c9a900",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#4c3f00",
        "tertiary-fixed": "#ffe16b",
        "tertiary-fixed-dim": "#e8c400",
        "on-tertiary-fixed": "#221b00",
        "on-tertiary-fixed-variant": "#544600",

        "surface": "#f7fafa",
        "surface-dim": "#d7dbdb",
        "surface-bright": "#f7fafa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f4f4",
        "surface-container": "#ebeeee",
        "surface-container-high": "#e6e9e9",
        "surface-container-highest": "#e0e3e3",
        "on-surface": "#181c1d",
        "on-surface-variant": "#45474b",
        "inverse-surface": "#2d3131",
        "inverse-on-surface": "#eef1f1",
        "surface-tint": "#595f68",
        
        "outline": "#75777c",
        "outline-variant": "#c5c6cb",
        
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        "success": "#067D62",
        "background": "#f7fafa",
        "on-background": "#181c1d"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      spacing: {
        "space-xxs": "0.125rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "0.75rem",
        "space-lg": "1rem",
        "space-xl": "1.5rem",
        "space-2xl": "2rem",
        "gutter-sm": "0.5rem",
        "gutter": "1rem",
        "gutter-lg": "1.25rem",
        "margin": "1rem",
        "margin-md": "1.25rem",
        "margin-lg": "1.5rem"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
