import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseWeather from '../reusable/ReuseWeather';
import ChatBox from './ChatBox';
//tmp
import profile from '../../asset/defaultprofile.jpg';


const ChatNav = ({chatListData}) => {
  const userData = useSelector((state) => state.user.userData);

  return(
    <ChatNavComp>
      <ChatNavHead>
        <ReuseProfile imgSrc={userData.profileImage ? userData.profileImage : profile} imgSize={60} content={'sparta13'} contentSize={14} />
        <ReuseWeather color={'black'} />
      </ChatNavHead>
      <ChatNavContainer>
        {chatListData.map((each) => 
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
