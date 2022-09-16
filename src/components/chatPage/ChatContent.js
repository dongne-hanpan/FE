import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../reusable/ReuseProfile';

// tmp
import defaultProfile from '../../asset/defaultprofile.jpg';


function ChatContent({data}) {
  return (
    <ChatContentComp isMe={data.isMe}>
      {data.isMe ? 
      <>
      <ChatUser>
        <ReuseProfile imgSrc={data.profileImage ? data.profileImage: defaultProfile} imgSize={30}/>
      </ChatUser>
      <ChatNameAndContent>
        <ChatNickname>{data.nickname}</ChatNickname>
        <Chat>{data.content}</Chat>
      </ChatNameAndContent>
      </>
      :
      <Chat>
        {data.content}
      </Chat>
      }
    </ChatContentComp>
  );
}


export default ChatContent;

const ChatContentComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({isMe}) => isMe ? 'flex-start':'flex-end'};
  padding: 10px 14px;
  margin-bottom: 10px;
`
const ChatUser = styled.div`
  height: 30px;
`
const ChatNameAndContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6px;
  margin-bottom: 12px;
`
const ChatNickname = styled.div`
  margin-top: 5px;
  margin-left: 6px;
  margin-bottom: 6px;
  font-size: ${({theme}) => theme.fontSize.font_15};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const Chat = styled.div`
  max-width: 270px;
  display: flex;
  padding: 4px 15px;
  font-size: ${({theme}) => theme.fontSize.font_14};
  background-color: ${({theme}) => theme.colors.background_light};
  border-radius: 0.5rem;
`
