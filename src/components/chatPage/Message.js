import styled from "styled-components";

const Message = ({ message, nickname, myMessage }) => {
  return (
    <MessageLayout myMessage={myMessage}>
      <MessageWrapper>
        <Nickname>{nickname}</Nickname>
        <MessageText>{message}</MessageText>
      </MessageWrapper>
    </MessageLayout>
  );
};



const MessageLayout = styled.div`
  display: flex;
  justify-content: ${(props) => (props.myMessage ? "end" : "start")};
`;

const MessageWrapper = styled.div`
  width: 200px;
  padding: 10px;
  border: 0.1px solid grey;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Nickname = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.palette.purple};
`;
const MessageText = styled.span`
  font-size: 12px;
`;


export default Message;
