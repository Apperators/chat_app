import { extendTheme } from "@chakra-ui/react";

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  primary: {
    50: "#828282",
    100: "#252329",
    150: "#E0E0E0"
  },
};

export const theme = extendTheme({ colors });
