import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReuseProfile from '../reusable/ReuseProfile';

// tmp
import defaultProfile from '../../asset/defaultprofile.jpg';


function ChatBox({data}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const nowChatId = pathname.split('/')[2];

  const moveToChatRoom = () => {
    navigate(`/chat/${data.chatId}`);
  }
  return (
    <ChatBoxComp isNow={parseInt(nowChatId) === data.chatId} onClick={moveToChatRoom}>
      <ChatUser>
        <ReuseProfile imgSrc={data.profileImage ? data.profileImage: defaultProfile} imgSize={30}/>
        <ChatNickname>{data.nickname}</ChatNickname>
      </ChatUser>
      <ChatPreview isNow={parseInt(nowChatId) === data.chatId}>
        {data.lastContent}
      </ChatPreview>
    </ChatBoxComp>
  );
}


export default ChatBox;

const ChatBoxComp = styled.div`
  width: 100%;
  height: 110px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 2px solid ${({theme}) => theme.colors.skyblue};
  border-radius: 1rem;  
  cursor: pointer;
  background-color: ${({isNow,theme}) => isNow ? theme.colors.skyblue:theme.colors.background};
`
const ChatUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`
const ChatNickname = styled.div`
  margin-left: 6px;
  font-size: ${({theme}) => theme.fontSize.font_15};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ChatPreview = styled.div`
  color: ${({isNow,theme}) => isNow ? theme.colors.background : theme.colors.black};
  font-size: ${({theme}) => theme.fontSize.font_15}
`