import styled from "styled-components";

export const ChannelHeaderWrapper = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: 0.1px solid grey;
  background-color: ${(props) => props.theme.palette.deep_blue};
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
`;

export const LogoutButton = styled.button`
  width: 70px;
  height: 40px;
  background-color: inherit;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
