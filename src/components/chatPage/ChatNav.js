import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../y_reusable/ReuseProfile';
import ReuseWeather from '../y_reusable/ReuseWeather';

//tmp
import me from '../../asset/profileMe.png';
import dummyChatList from '../../dummyData/dummyChatList';
import ChatBox from './ChatBox';


const ChatNav = () => {
  return(
    <ChatNavComp>
      <ChatNavHead>
        <ReuseProfile imgSrc={me} imgSize={60} content={'sparta13'} contentSize={14} />
        <ReuseWeather color={'black'} />
      </ChatNavHead>
      <ChatNavContainer>
        {dummyChatList.map((each) => 
          <ChatBox key={each.id} data={each} />
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
