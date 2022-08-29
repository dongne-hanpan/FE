import styled, { css } from "styled-components";

const Button = ({ children, bgColor, color, btnSize }) => {
  return (
    <Btn color={color} bgColor={bgColor} btnSize={btnSize}>
      {children}
    </Btn>
  );
};
export default Button;
Button.defaultProps = {
  btnSize: "mid",
  bgColor: "rgba(138, 204, 228, 1)",
  color: "white",
};
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  ${({ btnSize }) =>
    btnSize === "large" &&
    css`
      width: 250px;
      height: 50px;
      font-size: 1.2rem;
    `}
  ${({ btnSize }) =>
    btnSize === "mid" &&
    css`
      width: 100px;
      height: 40px;
      font-size: 1.2rem;
    `}
    ${({ btnSize }) =>
    btnSize === "small" &&
    css`
      width: 50px;
      height: 30px;
      font-size: 1.2rem;
    `}
  &:hover {
    background-color: rgba(202, 227, 236, 1);
  }
`;
