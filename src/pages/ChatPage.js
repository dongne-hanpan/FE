import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChatNav from '../components/chatPage/ChatNav';
import ReuseProfile from '../components/reusable/ReuseProfile';
import ChatContainer from '../components/chatPage/ChatContainer';
import { clearChatError, clearChatStatus, getChatDataThunk } from '../shared/redux/modules/chatSlice';
import { getCookie } from '../shared/axios/cookie';
import { clearDialogue, setDialogue } from '../shared/redux/modules/modalSlice';


const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nowChatId = useParams().match_id;
  const userData = useSelector((state) => state.user.userData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  const chatError = useSelector((state) => state.chat.error);

  useEffect(() => {
    if(nowChatId !== undefined){
      dispatch(getChatDataThunk(nowChatId));
    }
  },[nowChatId])

  useEffect(() => {
    if(chatStatus.statusType === 'reservedChatThunk'){
      dispatch(setDialogue({dialType: 'confirmReserved', matchId: nowChatId}));
      dispatch(clearChatStatus());
    }
    if(chatStatus.statusType === 'leaveChatThunk'){
      navigate(`/chat`);
      dispatch(clearChatStatus());
      dispatch(clearDialogue());
    }
    if(chatError.errorType === 'getChatDataThunk'){
      if(chatError.statusCode === 500){
        dispatch(setDialogue({dialType: 'denyEnterChatroom'}))
      } else if(chatError.statusCode === 404){
        dispatch(setDialogue({dialType: 'denyChatExist'}))
      }
      dispatch(clearChatError());
    }
    if(chatError.errorType === 'leaveChatThunk'){
      if(chatError.statusCode === 404){
        dispatch(setDialogue({dialType: 'denyChatExist'}))
      }
      dispatch(clearChatError());
    }
  },[chatData, chatError])

  //userdata 없으면 돌아가
  useEffect(() => {
    const cookie = getCookie('mytoken');
    if(!cookie && !userData.username){
      navigate('/')
    }
  },[userData, navigate])

  return (
    <MainPage>
      <ChatNav />
      <ChatNow>
        <ChatHead>
          <ChatInfo>
            <ChatDate>{chatData.date}<ChatTime>{chatData.time ? chatData.time : '채팅방을 선택해주세요'}</ChatTime></ChatDate>
            <ChatPlace>{chatData.place}</ChatPlace>
          </ChatInfo>
          <ChatPartici>
            {chatData.userListInMatch ? chatData.userListInMatch.map((each,params) => 
            <ReuseProfile key={params} direc={'horiz'} imgSrc={each.profileImage} imgSize={30} content={each.nickname} />
            ):<></>}
          </ChatPartici>
        </ChatHead>
        {nowChatId ? 
        <ChatContainer />
        :<></>}
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
