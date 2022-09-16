import { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../shared/hooks/useInput";
import { FiSend } from "react-icons/fi";
import StompJS from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import Message from "./Message";
import { getCookie } from "../../shared/axios_d/cookie";

const ChattingList = () => {
  const sender = window.localStorage.getItem("sender");
  const [message, messageHandler, setMessage] = useInput();
  const [messageList, setMessageList] = useState([]);
  const params = 1;
  const headers = {
    "Content-Type": "application/json", 
    "Authorization": `Bearer ${getCookie("mytoken")}`,
  };
  const BASE_URL = "http://3.38.191.6";
  // 엔드포인트
  let sock = new SockJS(`${BASE_URL}/ws/chat`);
  let client = StompJS.over(sock);

  useEffect(() => {
    if (params !== undefined) {
      connect();
      return () => {
        client.disconnect();
      };
    }
    return client.disconnect();
  }, [params]);

  useEffect(() => {
    axios.get(`${BASE_URL}/chat/message/${params}`, {headers}).then((res) => {
      console.log("서버에 전체 채팅 목록 요청", res.data);
      setMessageList([...res.data]);
    });
  }, []);

  const connect = () => {
    client.connect(headers, onConnected, onError);
  };

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

  const sendMessage = () => {
    client.send(
      `/app/chat/${params}`,
      headers,
      JSON.stringify({
        match_id: parseInt(params),
        user_id: "test1234",
        message: message,
      })
    );
    setMessage("");
  };

  return (
    <ChattingListWrapper>
      <MessageListWrapper>
        {messageList.slice(0).reverse().map((message, params) => (
          <Message
            key={params}
            message={message.message}
            sender={message.sender}
            myMessage={message.sender === sender ? true : false}
          />
        ))}
      </MessageListWrapper>

      <ChattingInputWrapper>
        <InputBox
          placeholder="메세지를 입력하세요"
          type={"text"}
          value={message}
          onChange={messageHandler}
        />
        <SubmitButton onClick={sendMessage}>
          <FiSend size="20" />
        </SubmitButton>
      </ChattingInputWrapper>
    </ChattingListWrapper>
  );
};



const ChattingListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
const MessageListWrapper = styled.div`
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  gap: 15px;
`;

const ChattingInputWrapper = styled.div`
  margin-top: 30px;
  height: 150px;
  width: 100%;
  padding: 10px;
  border: 0.1px solid grey;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  resize: none;
  :focus {
    outline: none;
    outline-color:  "#8ACCE4";
  }
`;

const SubmitButton = styled.button`
  width: 70px;
  height: 30px;
  padding: 3px;
  text-align: center;
  background-color: green;
  color: white;
  border-radius: 10px;
  border: none;
`;



export default ChattingList;
