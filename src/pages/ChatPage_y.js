import React from 'react';
import styled from 'styled-components';
import ChatContent from '../components/chatPage/ChatContent';
import ChatNav from '../components/chatPage/ChatNav';
import ReuseProfile from '../components/y_reusable/ReuseProfile';
import ReuseTextarea from '../components/y_reusable/ReuseTextarea';

import { dummyPartici,dummyContents } from '../dummyData/dummyPartici';

const ChatPage = () => {
  return (
    <MainPage>
      <ChatNav />
      <ChatNow>
        <ChatHead>
          <ChatInfo>
            <ChatDate>2022.08.09<ChatTime>12:00</ChatTime></ChatDate>
            <ChatPlace>동작 볼링장</ChatPlace>
          </ChatInfo>
          <ChatPartici>
            {dummyPartici.map((each) => 
            <ReuseProfile key={each.id} direc={'horiz'} imgSrc={each.profileImage} imgSize={30} content={each.nickname} />
            )}
          </ChatPartici>
        </ChatHead>

        <ChatContainer>
          {dummyContents.map((each) => 
          <ChatContent key={each.id} data={each}/>
          )}
        </ChatContainer>

        <ChatInput>
          <ChatInputBtns>
            <BtnResult> 결과 입력 </BtnResult>
            <BtnReserve> 예약 확정 </BtnReserve>
            <BtnOut> 나가기 </BtnOut>
          </ChatInputBtns>
          <ChatInputTalks>
            <ReuseTextarea height={100} />
            <ButtonBox> 전송 </ButtonBox>
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