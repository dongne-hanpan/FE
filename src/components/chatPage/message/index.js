import { MessageWrapper, MessageText, Nickname, MessageLayout } from "./style";

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

export default Message;
