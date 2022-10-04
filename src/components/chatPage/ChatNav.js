import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getMyChatListThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseWeather from '../reusable/ReuseWeather';
import ChatBox from './ChatBox';


const ChatNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nowChatId = useParams().match_id;
  const userData = useSelector((state) => state.user.userData);
  const myChatList = useSelector((state) => state.chat.chatList);

  // 받아온 나의 채팅리스트 종류에 따라 정렬
  const [sortedChatList, setSortedChatList] = useState(
    {
      recruitChatList:[],
      reservedChatList: [],
      doneChatList: []
    });

  useEffect(() => {
    const newSortedChatList = {
      recruitChatList:[],
      reservedChatList: [],
      doneChatList: []
    }
    myChatList.map((each) => {
      if(each.matchStatus === 'recruit'){
        newSortedChatList.recruitChatList.push(each)
      } else if(each.matchStatus === 'reserved'){
        newSortedChatList.reservedChatList.push(each)
      } else{
        newSortedChatList.doneChatList.push(each)
      }
    })
    setSortedChatList(newSortedChatList);
  },[myChatList])

  useEffect(() => {
    dispatch(getMyChatListThunk())
  },[dispatch,nowChatId])

  const goMyPage = () => {
    navigate('/mypage');
  }

  //완료된 매치 버튼 토글
  const [doneToggle, setDoneToggle] = useState(false);
  const showDoneToggle = () => {
    setDoneToggle(!doneToggle);
  }
  return(
    <ChatNavComp>
      <ChatNavHead>
        <ReuseProfile imgSrc={userData.profileImage} imgSize={60} content={userData.nickname} contentSize={14} clickEvent={goMyPage} />
        <ReuseWeather color={'black'} />
      </ChatNavHead>
      <ChatNavContainer>
        {sortedChatList.reservedChatList.map((each) => 
          <ChatBox key={each.chatId} data={each} />
        )}
        {sortedChatList.recruitChatList.map((each) => 
          <ChatBox key={each.chatId} data={each} />
        )}
        <ToggleBtn>
          <ReuseBtn styleType={'stretch'} content={doneToggle ? '닫기' : '완료된 방 보기'} clickEvent={showDoneToggle}/>
        </ToggleBtn>
        {doneToggle ? sortedChatList.doneChatList.map((each) => 
          <ChatBox key={each.chatId} data={each} />
        ):<></>}
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
const ToggleBtn = styled.div`
  margin-bottom: 10px;
`