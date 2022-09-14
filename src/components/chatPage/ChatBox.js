import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../y_reusable/ReuseProfile';

// tmp
import defaultProfile from '../../asset/defaultprofile.jpg';


function ChatBox({data}) {
  return (
    <ChatBoxComp>
      <ChatUser>
        <ReuseProfile imgSrc={data.profileImage ? data.profileImage: defaultProfile} imgSize={30}/>
        <ChatNickname>{data.nickname}</ChatNickname>
      </ChatUser>
      <ChatPreview>
        {data.lastTalk}
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
  font-size: ${({theme}) => theme.fontSize.font_15}
`