import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseBadge from '../reusable/ReuseBadge';


function ChatBox({data}) {
  const navigate = useNavigate();
  const nowChatId = useParams().match_id;
  const chatStatus = data.matchStatus;

  const convertChatStatus = () => {
    if(chatStatus === 'recruit'){
      return '모집 중';
    } else if(chatStatus === 'reserved'){
      return '모집 완료';
    } else if(chatStatus === 'done'){
      return '완료';
    }
  }

  const moveToChatRoom = () => {
    navigate(`/chat/${data.chatId}`);
  }
  return (
    <ChatBoxComp isNow={parseInt(nowChatId) === data.chatId} onClick={moveToChatRoom}>
      <ChatInfo>
        <BdgBox>
          <ReuseBadge bdgType={'status'} content={convertChatStatus()}/>
        </BdgBox>
        <ChatDate isNow={parseInt(nowChatId) === data.chatId}>{data.date}</ChatDate>
        <ChatPlace isNow={parseInt(nowChatId) === data.chatId}>{data.place}</ChatPlace>
      </ChatInfo>
      <ReuseProfile imgSrc={data.profileImage} content={data.hostNickname} />
    </ChatBoxComp>
  );
}


export default ChatBox;

const ChatBoxComp = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 2px solid ${({theme}) => theme.colors.skyblue};
  border-radius: 1rem;  
  cursor: pointer;
  background-color: ${({isNow,theme}) => isNow ? theme.colors.skyblue:theme.colors.background};
`

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`;
const BdgBox = styled.div`
  width: 70px;
  margin-bottom: 2px;
`
const ChatDate = styled.div`
  margin-bottom: 4px;
  color: ${({theme, isNow}) => isNow ? theme.colors.background_light : theme.colors.black};
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
`
const ChatPlace = styled.div`
  color: ${({theme, isNow}) => isNow ? theme.colors.background : theme.colors.darkgray};
  font-size: ${({theme}) => theme.fontSize.font_14};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`