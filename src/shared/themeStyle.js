const fontSize = {
  base: "1rem",
  large: "1.5rem",
  xlarge: "2rem",
  title: "3rem",
};
const padding = {
  base: "1rem",
  large: "1.5rem",
  xlarge: "2rem",
  xxlarge: "3rem",
};
const margin = {
  base: "1rem",
  large: "1.5rem",
  xlarge: "2rem",
  xxlarge: "3rem",
};
const palette = {
  blue: "#8BCCE3",
  deep_blue: "#0373F3",
  light_grey: "#BDBDBD",
  dark_grey: "#616061",
  ibory: "#F5EFD8",
  white: "#D9D9D9"
};

const theme = {
  fontSize,
  padding,
  margin,
  palette,
};

export default theme;

// 스타일드컴포넌트에서 사용 예시
// export const CustomBox = styled.span`
//   font-size: ${(props) => props.theme.fontSize.base};
// `;
