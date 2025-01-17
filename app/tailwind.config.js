/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const themeVariables = require("./src/styles/theme.styles"); // Adjust the path as necessary

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        // Extend animations
        bounce: "bounce 1s", // Add custom 'bounce' animation
      },
      keyframes: {
        // Extend keyframes
        bounce: {
          // Define 'bounce' keyframes
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      colors: {
        lightGrey: "#EDEDED",
        lightRed: "rgba(243, 48, 71, 0.10)",
        lightGreen: "rgba(126, 230, 155, 0.1)",
        green: "#7EE69B",
        greycus: "rgba(2, 5, 10, 0.50)",

        greyhighlight: "rgba(2, 5, 10, 0.05)",
        PRIMARY_COLOR: "#00233c", //themeVariables.PRIMARY_COLOR,
        PRIMARY_COLOR_2: "#00233c", //themeVariables?.PRIMARY_COLOR,
        PRIMARY_LIGHT_COLOR: "#99a7b1", //themeVariables.PRIMARY_LIGHT_COLOR,
        // PRIMARY_LIGHT_DARKER: "#D8F1F7",
        PRIMARY_LIGHT_DARKER: "#D8F1F7", // Adjusted to fit the new theme
        PRIMARY_NEUTRAL_COLOR: "#F3FAFD", //themeVariables.PRIMARY_NEUTRAL_COLOR,
        // DELETE_LIGHT_PRIMARY: "#F330471A",
        // TEXT_FIELD_BACKGROUND: "#F3FAFD",
        DELETE_LIGHT_PRIMARY: themeVariables.RED_LIGHT,
        TEXT_FIELD_BACKGROUND: themeVariables.PRIMARY_VERY_LIGHT,
        RADIO_LABEL_COLOR: "#02050A80",

        WHITE: "#FFFFFF",

        SECONDARY_COLOR: "#FFAF32",
      },
      fontSize: {
        xxs: "0.6rem", // you can add the custom size here
        xxxs: "0.40rem", // you can add the custom size here
        xxl: "1.5rem",
      },
      boxShadow: {
        "custom-light": "0 30px 30px -15px rgba(29, 1, 80, 0.05)",
        "black/30":
          // "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          "0 0 10px 2px rgba(0, 0, 0, 0.3)",
      },
      // Add new utilities
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(to right, ${theme(
          "colors.PRIMARY_COLOR"
        )}, ${theme("colors.PRIMARY_LIGHT_COLOR")})`,
      }),
    },
  },
  variants: {
    extend: {
      animation: ["hover"], // Enable hover variant for animation utility
      scale: ["hover", "focus"], // Enable hover and focus variant for scale utility
      boxShadow: ["dark", "hover"],
      // opacity: ["disabled"],
      // cursor: ["disabled"],
    },
  },
  plugins: [],
};
