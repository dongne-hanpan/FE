import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ChatContent from './ChatContent';

//채팅
import StompJS from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { getCookie } from "../../shared/axios/cookie";
import useInput from "../../shared/hooks/useInput";
import { useDispatch, useSelector } from 'react-redux';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseTextarea from '../reusable/ReuseTextarea';


const ChatContainer = ({chatStatus, chatContents}) => {
  const [message, messageHandler, setMessage] = useInput();
  const [messageList, setMessageList] = useState([]);
  const params = useParams().match_id;
  const headers = {
    "Content-Type": "application/json", 
    "Authorization": `Bearer ${getCookie("mytoken")}`,
  };
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //나 이제 채팅 쓸꺼야
  let sock = new SockJS(`${BASE_URL}/ws/chat`);
  let client = StompJS.over(sock);

  const onConnected = () => {
    console.log("연결됨");
    client.subscribe(
      `/queue/match/${params}`,
      (message) => {
        if (message.body) {
          axios.get(`${BASE_URL}/chat/message/${params}`, {headers}).then((res) => {
          console.log("서버에 전체 채팅 목록 요청", res.data);
          const new_Data = JSON.parse(message.body);
          setMessageList([...res.data]);
        });
        } else {
          alert("메세지가 없습니다.");
        }
      }
    );
  };
  const onError = (err) => {
    console.log(err);
  };
  const connect = () => {
    client.connect(headers, onConnected, onError);
  };

  useEffect(() => {
    if (params !== undefined) {
      connect();
      return () => {
        client.disconnect();
      };
    }
    return client.disconnect();
  }, [params]);


  //채팅 목록을 가져오기
  useEffect(() => {
    axios.get(`${BASE_URL}/chat/message/${params}`, {headers}).then((res) => {
      console.log("서버에 전체 채팅 목록 요청", res.data);
      setMessageList([...res.data]);
    });
  }, [params]);

  //메세지 보내기 관련
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.nowChatData);
  const userData = useSelector((state) => state.user.userData);

  const writeResult = () => {
    if(chatStatus === 'recruit'){
      const modalResultData = {
        modalType: 'matchResult',
        matchDay: chatData.date,
        matchTime: chatData.time,
        matchPlace: chatData.place,
        reservedPeople: chatData.userListInMatch
      }
      dispatch(setModal(modalResultData));
    } else{
      const dialDenyResult = {
        dialType: 'denyResult'
      };
      dispatch(setDialogue(dialDenyResult));
    }
  }

  const reserve = () => {
    if(chatStatus === 'recruit'){
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

  const sendMessage = () => {
    client.send(
      `/app/chat/${params}`,
      headers,
      JSON.stringify({
        match_id: parseInt(params),
        message: message,
      })
    );
    setMessage("");
  };
  // console.log(messageList.slice(0).reverse());
  return(
    <>
    <ChatContainerComp>
        {messageList.map((each, params) => (
          <ChatContent key={params} data={each} />
        ))}
    </ChatContainerComp>
    <ChatInput>
      <ChatInputBtns>
        <BtnResult onClick={writeResult}> 결과 입력 </BtnResult>
        {/* { chatData.hostNickname === userData.nickname ?
          <BtnReserve onClick={reserve}> 예약 확정 </BtnReserve>
          :<></>
        } */}
        <BtnOut onClick={leaveChatRoom}> 나가기 </BtnOut>
      </ChatInputBtns>
      <ChatInputTalks>
        <ReuseTextarea height={100} value={message} onChageEvent={messageHandler} />
        <ButtonBox onClick={sendMessage}> 전송 </ButtonBox>
      </ChatInputTalks>
    </ChatInput>
    </>
  )
}

export default ChatContainer;

const ChatContainerComp = styled.article`
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