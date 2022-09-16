import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatContent from '../components/chatPage/ChatContent';
import ChatNav from '../components/chatPage/ChatNav';
import ReuseProfile from '../components/y_reusable/ReuseProfile';
import ReuseTextarea from '../components/y_reusable/ReuseTextarea';
import { setDialogue, setModal } from '../shared/redux_d/modules/modalSlice';

import { dummyChatList, dummyChatDatas } from '../dummyData/dummyChat';

const ChatPage = () => {
  const {pathname} = useLocation();
  const nowChatId = pathname.split('/')[2];

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const chatListData = dummyChatList;
  const chatData = dummyChatDatas[nowChatId];
  
  //userdata 없으면 돌아가
  const navigate = useNavigate();
  useEffect(() => {
    if(!userData.username){
      navigate('/')
    }
  },[userData])

  const writeResult = () => {
    if(chatData.status === 'reserved'){
      const modalResultData = {
        modalType: 'matchResult',
        matchDay: chatData.matchDay,
        matchTime: chatData.matchTime,
        matchPlace: chatData.matchPlace,
        reservedPeople: chatData.reservedPeople
      }
      dispatch(setModal(modalResultData));
    } else{
      console.log('hyy');
      const dialDenyResult = {
        dialType: 'denyResult'
      };
      dispatch(setDialogue(dialDenyResult));
    }
  }

  const reserve = () => {
    if(chatData.status === 'recruit'){
      const dialReserveWhoData = {
        dialType: 'reserveWho',
        participants: chatData.participants
      };
      dispatch(setDialogue(dialReserveWhoData))
    }
  }

  const leaveChatRoom = () => {
    if(chatData.hostNickname === userData.nickname){
      console.log('host out and remove this room');
    } else{
      console.log('just leave one person');
    }
  }

  const chatRef = useRef(null);
  const saySomething = () => {
    const chatRefValue = chatRef.current.value;
    // 채팅 보내기
    console.log(chatRefValue);

    chatRef.current.value = '';
  }
  return (
    <MainPage>
      <ChatNav chatListData = {chatListData}/>
      <ChatNow>
        <ChatHead>
          <ChatInfo>
            <ChatDate>{chatData.matchDay}<ChatTime>{chatData.matchTime}</ChatTime></ChatDate>
            <ChatPlace>{chatData.matchPlace}</ChatPlace>
          </ChatInfo>
          <ChatPartici>
            {chatData.participants.map((each) => 
            <ReuseProfile key={each.participantId} direc={'horiz'} imgSrc={each.profileImage} imgSize={30} content={each.nickname} />
            )}
          </ChatPartici>
        </ChatHead>

        <ChatContainer>
          {chatData.chatContents.map((each) => 
          <ChatContent key={each.id} data={each}/>
          )}
        </ChatContainer>

        <ChatInput>
          <ChatInputBtns>
            <BtnResult onClick={writeResult}> 결과 입력 </BtnResult>
            { chatData.hostNickname === userData.nickname ?
              <BtnReserve onClick={reserve}> 예약 확정 </BtnReserve>
              :<></>
            }
            <BtnOut onClick={leaveChatRoom}> 나가기 </BtnOut>
          </ChatInputBtns>
          <ChatInputTalks>
            <ReuseTextarea injRef={chatRef} height={100} />
            <ButtonBox onClick={saySomething}> 전송 </ButtonBox>
          </ChatInputTalks>
        </ChatInput>

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
const ChatContainer = styled.article`
  height: 440px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ChatInput = styled.article`
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({theme}) => theme.colors.skyblue};
`
const ChatInputBtns = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 10px;
  margin-bottom: 2px;
`
const BtnResult = styled.button`
  height: 30px;
  padding: 4px 14px;
  color: ${({theme}) => theme.colors.green};
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme}) => theme.colors.green};
  border-radius: 2rem;
  background-color: ${({theme}) => theme.colors.background};
`;
const BtnReserve = styled.button`
  height: 30px;
  padding: 4px 14px;
  margin-left: 10px;
  color: ${({theme}) => theme.colors.core};
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme}) => theme.colors.core};
  border-radius: 2rem;
  background-color: ${({theme}) => theme.colors.background};
`;
const BtnOut = styled.button`
  height: 30px;
  padding: 4px 14px;
  margin-left: 10px;
  color: ${({theme}) => theme.colors.red_light};
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme}) => theme.colors.red_light};
  border-radius: 2rem;
  background-color: ${({theme}) => theme.colors.background};
`;
const ChatInputTalks = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  padding: 0px 10px;
`
const ButtonBox = styled.button`
  width: 150px;
  height: 100px;
  margin-left: 10px;
  border-radius: 0.5rem;
  color: ${({theme}) => theme.colors.background};
  background-color: ${({theme}) => theme.colors.skyblue};
`