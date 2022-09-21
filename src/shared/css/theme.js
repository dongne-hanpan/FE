const calcRem = (size) => `${size / 16}rem`

const colors = {
  black: "#000000",
  core: "#0373F3",
  skyblue: "#8ACCE4",
  background: "#F5EFD7",
  background_light: "#FFFCF1",
  //point color
  red: "#CC0000",
  green: "#41CC00",
  yellow: "#FFC700",
  // addtional color
  dark: "#6d6d6d71",
  darkgray: "#767676",
  gray: "#b5b3ac",
  red_light: "#ff0000",
  red_pale: "#ffa2a2",
  orange: "#ff9100",
  orange_pale: "#ffcf91",
};

const fontSize = {
  font_40: calcRem(40),
  font_32: calcRem(32),
  font_26: calcRem(26),
  font_24: calcRem(24),
  font_22: calcRem(22),
  font_20: calcRem(20),
  font_18: calcRem(18),
  font_17: calcRem(17),
  font_16: calcRem(16),
  font_15: calcRem(15),
  font_14: calcRem(14),
  font_13: calcRem(13),
  font_12: calcRem(12),
}
  /* Font weight */
const fontWeight = {
  bold: 700,
  semi_bold: 600,
  medium: 500,
  regular: 400,
  light: 300,
}

const theme = {
  colors,
  fontSize,
  fontWeight
}

export default theme;