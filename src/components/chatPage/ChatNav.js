import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { getMyChatListThunk } from '../../shared/redux/modules/chatSlice';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseWeather from '../reusable/ReuseWeather';
import ChatBox from './ChatBox';


const ChatNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nowChatId = useParams().match_id;
  const userData = useSelector((state) => state.user.userData);
  const myChatList = useSelector((state) => state.chat.chatList);

  useEffect(() => {
    dispatch(getMyChatListThunk())
  },[dispatch,nowChatId])

  const goMyPage = () => {
    navigate('/mypage');
  }
  return(
    <ChatNavComp>
      <ChatNavHead>
        <ReuseProfile imgSrc={userData.profileImage} imgSize={60} content={userData.nickname} contentSize={14} clickEvent={goMyPage} />
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
