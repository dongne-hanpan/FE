import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReuseProfile from '../reusable/ReuseProfile';


function ChatContent({injRef, data}) {
  const userData = useSelector((state) => state.user.userData);
  const afterConvert = data.message.replace('%0D%0A','<br />')
  const contentArea = useRef(null);
  useEffect(() => {
    contentArea.current.innerHTML= afterConvert;
  },[])

  return (
    <ChatContentComp ref={injRef} isMe={data.sender !== userData.nickname}>
      {data.sender !== userData.nickname ? 
      <>
      <ChatUser>
        <ReuseProfile imgSrc={data.profileImage} imgSize={30}/>
      </ChatUser>
      <ChatNameAndContent>
        <ChatNickname>{data.sender}</ChatNickname>
        <Chat ref={contentArea} />
      </ChatNameAndContent>
      </>
      :
      <Chat ref={contentArea} />
      }
    </ChatContentComp>
  );
}


export default ChatContent;

const ChatContentComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({isMe}) => isMe ? 'flex-start':'flex-end'};
  padding: ${({isMe}) => isMe ? '4px 14px':'10px 14px'}; ;
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
  padding: 8px 10px 5px 12px;
  font-size: ${({theme}) => theme.fontSize.font_14};
  color: ${({theme}) => theme.colors.deepdarkgray};
  background-color: ${({theme}) => theme.colors.background_light};
  line-height: 19px;
  border-radius: 0.5rem;
`
