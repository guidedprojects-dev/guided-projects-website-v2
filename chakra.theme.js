import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#e7f9e9",
      100: "#c8e8ca",
      200: "#a7d7aa",
      300: "#85c889",
      400: "#63b867",
      500: "#4a9e4e",
      600: "#387b3c",
      700: "#28582a",
      800: "#163518",
      900: "#021402",
    },
    dark: {
      50: "#edf0fe",
      100: "#cdd3e7",
      200: "#adb5d2",
      300: "#8d98bf",
      400: "#6c7aac",
      500: "#526193",
      600: "#404b73",
      700: "#2d3653",
      800: "#1a2034",
      900: "#060b17",
    },
  },
});

export default customTheme;
