import styled from "styled-components";

export const MessageLayout = styled.div`
  display: flex;
  justify-content: ${(props) => (props.myMessage ? "end" : "start")};
`;

export const MessageWrapper = styled.div`
  width: 200px;
  padding: 10px;
  border: 0.1px solid grey;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const Nickname = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.palette.purple};
`;

export const MessageText = styled.span`
  font-size: 12px;
`;
