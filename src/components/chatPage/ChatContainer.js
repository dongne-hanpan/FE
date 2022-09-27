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
import { dummySports } from '../../dummyData/dummyIndex';
import { getLocal } from '../../shared/axios/local';
import { getChatDataThunk, reservedChatThunk } from '../../shared/redux/modules/chatSlice';


const ChatContainer = () => {
  const [message, messageHandler, setMessage] = useInput();
  const [messageList, setMessageList] = useState([]);
  const nowChatId = useParams().match_id;
  const headers = {
    "Content-Type": "application/json", 
    "Authorization": `Bearer ${getCookie("mytoken")}`,
  };
  const BASE_URL = "http://3.38.191.6";
  // const BASE_URL = process.env.REACT_APP_BASE_URL;

  //나 이제 채팅 쓸꺼야
  let sock = new SockJS(`${BASE_URL}/ws/chat`);
  let client = StompJS.over(sock);

  const onConnected = () => {
    console.log("연결됨");
    client.subscribe(
      `/queue/match/${nowChatId}`,
      (message) => {
        if (message.body) {
          axios.get(`${BASE_URL}/chat/message/${nowChatId}`, {headers}).then((res) => {
          console.log("서버에 전체 채팅 목록 요청", res.data);
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
    if (nowChatId !== undefined) {
      connect();
      return () => {
        client.disconnect();
      };
    }
    return client.disconnect();
  }, [nowChatId]);


  //채팅 목록을 가져오기
  useEffect(() => {
    axios.get(`${BASE_URL}/chat/message/${nowChatId}`, {headers}).then((res) => {
      setMessageList([...res.data]);
    });
  }, [nowChatId]);

  //메세지 보내기 관련
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.nowChatData);
  const matchStatus = chatData.matchStatus
  const userData = useSelector((state) => state.user.userData);
  const sportsLocal = getLocal('sports');
  const sports = sportsLocal.sports;
  const matchsports = dummySports.filter((each) => each.sports === sports)[0];
  
  const doReserved = () => {
    if( matchStatus === 'done'){
      dispatch(setDialogue({dialType: 'alreadyDone'}))
    }else if( matchStatus === 'recruit'){
      console.log(chatData.userListInMatch);
      if(chatData.matchIntakeFull !== 1 && chatData.userListInMatch.length === 1){
        dispatch(setDialogue({dialType: 'confirmAlone', matchId: nowChatId}));
      }else{
        dispatch(setDialogue({dialType: 'confirmReserve', matchId: nowChatId}));
      }
    } else{
      dispatch(setDialogue({dialType: 'denyReserved'}));
    }
  }
  const writeResult = () => {
    if( matchStatus === 'done'){
      dispatch(setDialogue({dialType: 'alreadyDone'}))
    }else if( matchStatus === 'recruit'){
      const modalResultData = {
        modalType: 'matchResult',
        sportsImage: matchsports.sportsImage,
      }
      dispatch(setModal(modalResultData));
    } else{
      dispatch(setDialogue({dialType: 'denyResult'}));
    }
  }
  const writeComment = () => {
    if( matchStatus === 'done'){
      dispatch(setDialogue({dialType: 'alreadyDone'}))
    }else if( matchStatus === 'recruit'){
      const modalCommentData = {
        modalType: 'matchComment',
        sportsImage: matchsports.sportsImage,
      }
      dispatch(setModal(modalCommentData));
    } else{
      dispatch(setDialogue({dialType: 'denyResult'}));
    }
  }

  const leaveChatRoom = () => {
    if(chatData.writer === userData.nickname){
      dispatch(setDialogue({dialType: 'removeMatch', matchId: nowChatId, isHost: true}));
    } else{
      dispatch(setDialogue({dialType: 'removeMatch', matchId: nowChatId, isHost: false}));
    }
  }

  const sendMessage = () => {
    if( matchStatus !== 'done'){
      client.send(
        `/app/chat/${nowChatId}`,
        headers,
        JSON.stringify({
          match_id: parseInt(nowChatId),
          message: message,
        })
      );
      setMessage("");
    }
  };
  return(
    <>
    <ChatContainerComp>
        {messageList.map((each, params) => (
          <ChatContent key={params} data={each} />
        ))}
    </ChatContainerComp>
    <ChatInput>
      <ChatInputBtns>
        { chatData.writer === userData.nickname ?
          <BtnReserve matchStatus={matchStatus} onClick={doReserved}> 모집 완료 </BtnReserve>
          :<></>
        }
        <BtnResult matchStatus={matchStatus} onClick={writeResult}> 나의 결과 </BtnResult>
        <BtnComment matchStatus={matchStatus} onClick={writeComment}> 후기 입력 </BtnComment>
        <BtnOut matchStatus={matchStatus} onClick={leaveChatRoom}> 나가기 </BtnOut>
      </ChatInputBtns>
      <ChatInputTalks>
        <ReuseTextarea height={100} value={message} onChageEvent={messageHandler} />
        <ButtonBox matchStatus={matchStatus} onClick={sendMessage}> 전송 </ButtonBox>
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
const BtnReserve = styled.button`
  height: 30px;
  padding: 4px 14px;
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.yellow};
  border-radius: 2rem;
  color: ${({theme,matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.yellow};
  background-color: ${({theme}) => theme.colors.background};
`;
const BtnResult = styled.button`
  height: 30px;
  padding: 4px 14px;
  margin-left: 6px;
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.green};
  border-radius: 2rem;
  color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.green};
  background-color: ${({theme}) => theme.colors.background};
`;
const BtnComment = styled.button`
  height: 30px;
  padding: 4px 14px;
  margin-left: 6px;
  font-weight: ${({theme}) => theme.fontWeight.semi_bold};
  border: 2px solid ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.core};
  border-radius: 2rem;
  color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.core};
  background-color: ${({theme}) => theme.colors.background};
`;
const BtnOut = styled.button`
  height: 30px;
  padding: 4px 14px;
  margin-left: 6px;
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
  color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.darkgray : theme.colors.background};
  background-color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.skyblue};
`