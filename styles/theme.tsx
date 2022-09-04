// import { createTheme } from '@material-ui/core/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#0EA56F',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
//   typography: {
//     h1: {
//       fontSize: 60,
//       lineHeight: '66px',
//       textTransform: 'uppercase',
//       marginTop: 96,
//       marginBottom: 96,
//     },
//   },
// });

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: "white",
        },
      },
    },
  },
  fonts: {
    heading: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  colors: {
    gray: {
      50: "#F5F5F5",
      100: "#F0F0F0",
      200: "#EBEBEB",
      300: "#D6D6D6",
      400: "#C2C2C2",
      500: "#A3A3A3",
      600: "#858585",
      700: "#5C5C5C",
      800: "#333333",
      900: "#141414",
    },
    caringRed: {
      50: "#FFE8E0",
      100: "#FFBFB1",
      200: "#FF917F",
      300: "#FF604D",
      400: "#FE431B",
      500: "#E53A01",
      600: "#B33700",
      700: "#812F00",
      800: "#4F1F00",
      900: "#200D00",
    },
    caringRedProgressBar: {
      500: "#FE431B",
    },
    caringOrange: {
      50: "#FFFAF0",
      100: "#FEEBCB",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
    },
    caringGreen: {
      50: "#F0FFF4",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
      500: "#38A169",
      600: "#25855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532",
    },
    caringBlue: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#90CDF4",
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE",
      600: "#2B6CB0",
      700: "#2C5282",
      800: "#2A4365",
      900: "#1A365D",
    },
    caringDarkBlueCheckbox: {
      400: "#2C5282",
      500: "#2A4365",
      600: "#1A365D",
    },
  },
});

export default theme;