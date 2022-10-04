import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import StompJS from "stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../../shared/axios/cookie";
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import { getLocal } from '../../shared/axios/local';
import { getWithCookie } from '../../shared/axios/axios';
import { sportsData } from '../../data/regionSportsData';
import ChatContent from './ChatContent';
import ChatNotice from './ChatNotice';


const ChatContainer = () => {
  const [messageList, setMessageList] = useState([]);
  const nowChatId = useParams().match_id;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const cookie = getCookie('mytoken');
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${cookie}`,
  };
  //채팅 init
  let sock = new SockJS(`${BASE_URL}/ws/chat`);
  let client = StompJS.over(sock);

  // 채팅 연결
  const connectWebsocket = async() => {
    const res = await getWithCookie(`/chat/message/${nowChatId}`,cookie);
    setMessageList([...res])
  }
  const onConnected = () => { client.subscribe(`/queue/match/${nowChatId}`,connectWebsocket) };
  const onError = (err) => { console.error(err) };
  const connect = () => {
    client.connect(headers, onConnected, onError);
  };
  //채팅방 안에 있다면 연결
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

  //채팅방 각종 action 관련
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  const sportsLocal = getLocal('sports');
  const sports = sportsLocal.sports;
  const matchsports = sportsData.filter((each) => each.sports === sports)[0];
  const matchStatus = chatData.matchStatus;

  const doReserved = () => {
    if( matchStatus === 'done'){
      dispatch(setDialogue({dialType: 'alreadyDone'}))
    }else if( matchStatus === 'recruit'){
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
    }else if( matchStatus === 'reserved'){
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
    }else if( matchStatus === 'reserved'){
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
  //메세지 보내기
  const msgArea = useRef(null);
  const sendMessage = () => {
    if( matchStatus !== 'done'){
      let msgAreaValue = msgArea.current.value;
      if(msgAreaValue === null || msgAreaValue === undefined || msgAreaValue === ''){
        return
      }
      client.send(
        `/app/chat/${nowChatId}`,
        headers,
        JSON.stringify({
          type: 'message',
          match_id: parseInt(nowChatId),
          message: msgAreaValue.replace(/\n\r?/g, '%0D%0A'),
        })
      );
      msgArea.current.value = '';
    }
  };

  //메시지 가장 아래로 이동
  const lastMsg = useRef(null);
  useEffect(() => {
    if(lastMsg.current !== null){
      lastMsg.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  },[messageList])

  // enter로 메시지 보내기
  const keyDownHandler = (e) => {
    if(e.code === 'Enter'){
      if (e.nativeEvent.isComposing){
        return
      }
      const nowTextareaValue = msgArea.current.value;
      if(e.ctrlKey || e.altKey){
        msgArea.current.value = nowTextareaValue + '\r\n';
      }else{
        e.preventDefault();
        sendMessage();
      }
    }
  }
  
  return(
    <>
    <ChatContainerComp>
        {messageList.length >0 ? messageList.map((each, idx) => {
          if(each.type === 'message'){
            return <ChatContent injRef={idx === messageList.length-1 ? lastMsg : null} key={idx} data={each} />
          } else{
            return <ChatNotice key={idx} injRef={idx === messageList.length-1 ? lastMsg : null} data={each} />
          }
        }):<></>}
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
        <ChatTextarea ref={msgArea} onKeyDown={keyDownHandler}/>
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
const ChatTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px 16px;
  margin-bottom: 14px;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.background_light};
  resize: none;
`
const ButtonBox = styled.button`
  width: 150px;
  height: 100px;
  margin-left: 10px;
  border-radius: 0.5rem;
  color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.darkgray : theme.colors.background};
  background-color: ${({theme, matchStatus}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.skyblue};
`