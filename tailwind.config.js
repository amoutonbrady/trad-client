/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

console.log(process.env.NODE_ENV === "production");
module.exports = {
  // purge: false,
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.tsx", "./src/**/*.ts", "./src/**/*.html", "./*.html"],
  },
  theme: {
    container: {
      center: true,
    },
    // Palette 10
    colors: {
      // Primary
      "indigo-050": "#E0E8F9",
      "indigo-100": "#BED0F7",
      "indigo-200": "#98AEEB",
      "indigo-300": "#7B93DB",
      "indigo-400": "#647ACB",
      "indigo-500": "#4C63B6",
      "indigo-600": "#4055A8",
      "indigo-700": "#35469C",
      "indigo-800": "#2D3A8C",
      "indigo-900": "#19216C",

      // Neutrals
      "gray-050": "#F5F7FA",
      "gray-100": "#E4E7EB",
      "gray-200": "#CBD2D9",
      "gray-300": "#9AA5B1",
      "gray-400": "#7B8794",
      "gray-500": "#616E7C",
      "gray-600": "#52606D",
      "gray-700": "#3E4C59",
      "gray-800": "#323F4B",
      "gray-900": "#1F2933",

      // Supporting
      "blue-050": "#E3F8FF",
      "blue-100": "#B3ECFF",
      "blue-200": "#81DEFD",
      "blue-300": "#5ED0FA",
      "blue-400": "#40C3F7",
      "blue-500": "#2BB0ED",
      "blue-600": "#1992D4",
      "blue-700": "#127FBF",
      "blue-800": "#0B69A3",
      "blue-900": "#035388",

      "red-050": "#FFE3E3",
      "red-100": "#FFBDBD",
      "red-200": "#FF9B9B",
      "red-300": "#F86A6A",
      "red-400": "#EF4E4E",
      "red-500": "#E12D39",
      "red-600": "#CF1124",
      "red-700": "#AB091E",
      "red-800": "#8A041A",
      "red-900": "#610316",

      "yellow-050": "#FFFBEA",
      "yellow-100": "#FFF3C4",
      "yellow-200": "#FCE588",
      "yellow-300": "#FADB5F",
      "yellow-400": "#F7C948",
      "yellow-500": "#F0B429",
      "yellow-600": "#DE911D",
      "yellow-700": "#CB6E17",
      "yellow-800": "#B44D12",
      "yellow-900": "#8D2B0B",

      "teal-050": "#EFFCF6",
      "teal-100": "#C6F7E2",
      "teal-200": "#8EEDC7",
      "teal-300": "#65D6AD",
      "teal-400": "#3EBD93",
      "teal-500": "#27AB83",
      "teal-600": "#199473",
      "teal-700": "#147D64",
      "teal-800": "#0C6B58",
      "teal-900": "#014D40",
    },
    extend: {
      inset: (theme) => ({
        ...theme("spacing"),
        "1/2": "50%",
      }),
      fontFamily: {
        sans: [
          '"Inter var"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
    },
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
};
