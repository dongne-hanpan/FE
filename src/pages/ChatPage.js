import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChatNav from '../components/chatPage/ChatNav';
import ReuseProfile from '../components/reusable/ReuseProfile';

import { dummyChatList, dummyChatDatas } from '../dummyData/dummyChat';
import ChatContainer from '../components/chatPage/ChatContainer';
import { getChatDataThunk } from '../shared/redux/modules/chatSlice';

//tmp
import profile from '../asset/defaultprofile.jpg';


const ChatPage = () => {
  const dispatch = useDispatch();
  const nowChatId = useParams().match_id;
  const userData = useSelector((state) => state.user.userData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  //내가 속해있는 채팅방 리스트 요청하는 API (만들어야 함)
  const chatListData = dummyChatList;
  //채팅방 데이터 요청하는 API (만들어야 함)
  // const chatData = dummyChatDatas[nowChatId];
  useEffect(() => {
    dispatch(getChatDataThunk(nowChatId))
  },[])

  //userdata 없으면 돌아가
  const navigate = useNavigate();
  useEffect(() => {
    if(!userData.username){
      navigate('/')
    }
  },[userData])

  return (
    <MainPage>
      <ChatNav chatListData = {chatListData}/>
      <ChatNow>
        <ChatHead>
          <ChatInfo>
            <ChatDate>{chatData.date}<ChatTime>{chatData.time}</ChatTime></ChatDate>
            <ChatPlace>{chatData.place}</ChatPlace>
          </ChatInfo>
          <ChatPartici>
            {chatData.userListInMatch ? chatData.userListInMatch.map((each) => 
            <ReuseProfile key={each.reservedId} direc={'horiz'} imgSrc={each.profileImage ? each.profileImage : profile} imgSize={30} content={each.nickname} />
            ):<></>}
          </ChatPartici>
        </ChatHead>

        <ChatContainer chatStatus={chatData.matchStatus} chatContents={chatData.chatContents} />
      </ChatNow>
    </MainPage>
  )
}

export default ChatPage;

const MainPage = styled.main`
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ChatNow = styled.section`
  position: relative;
  width: 440px;
  height: 690px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 3px solid ${({theme}) => theme.colors.skyblue};
  border-radius: 1rem;
`
const ChatHead = styled.article`
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  border-bottom: 2px solid ${({theme}) => theme.colors.skyblue};
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  background-color: ${({theme}) => theme.colors.core};
`
const ChatInfo = styled.div`
`;
const ChatDate = styled.div`
  margin-bottom: 6px;
  color: ${({theme}) => theme.colors.background};
  font-size: ${({theme}) => theme.fontSize.font_32};
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
`
const ChatTime = styled.span`
  margin-left: 10px;
  color: ${({theme}) => theme.colors.skyblue};
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ChatPlace = styled.div`
  color: ${({theme}) => theme.colors.background};
  font-size: ${({theme}) => theme.fontSize.font_22};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ChatPartici = styled.div`
  display: flex;
`;
