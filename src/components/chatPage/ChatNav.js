import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMyChatListThunk } from '../../shared/redux/modules/chatSlice';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseWeather from '../reusable/ReuseWeather';
import ChatBox from './ChatBox';
//tmp
import profile from '../../asset/defaultprofile.jpg';


const ChatNav = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const myChatList = useSelector((state) => state.chat.chatList);
  console.log(myChatList);

  useEffect(() => {
    dispatch(getMyChatListThunk())
  },[])

  return(
    <ChatNavComp>
      <ChatNavHead>
        <ReuseProfile imgSrc={userData.profileImage ? userData.profileImage : profile} imgSize={60} content={userData.nickname} contentSize={14} />
        <ReuseWeather color={'black'} />
      </ChatNavHead>
      <ChatNavContainer>
        {myChatList.map((each) => 
          <ChatBox key={each.chatId} data={each} />
        )}
      </ChatNavContainer>
    </ChatNavComp>
  )
};


export default ChatNav;

const ChatNavComp = styled.section`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const ChatNavHead = styled.article`
  width: 90%;
  min-width: 220px;
  height: 120px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-bottom: 10px;
  border: 2px solid ${({theme}) => theme.colors.skyblue};
  border-radius: 1rem;  
`
const ChatNavContainer = styled.article`
  width: 90%;
  min-width: 220px;
  height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
