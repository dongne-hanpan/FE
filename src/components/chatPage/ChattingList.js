import useInput from "../../shared/hooks/useInput";
import { FiSend } from "react-icons/fi";
// import { MessageWrapper } from "../message/style";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import { connect } from "../../socket/clients";
import { useParams } from "react-router";
import StompJS from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import axios from "axios";
import Message from "./Message";

const ChattingList = () => {
  const username = window.localStorage.getItem("username");
  const [message, messageHandler, setMessage] = useInput();
  const [messageList, setMessageList] = useState([]);
  const params = useParams().channel_id;
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };

  // 엔드포인트
  let sock = new SockJS(`http://15.165.158.16/socket`);
  let client = StompJS.over(sock);

  useEffect(() => {
    // console.log("params 바뀜", messageList);
    if (params !== undefined) {
      connect();
      return () => {
        client.disconnect();
        window.location.reload();
      };
    }
    return client.disconnect();
  }, [params]);

  useEffect(() => {
    axios.get(`http://15.165.158.16/entry/${params}`, headers).then((res) => {
      console.log("서버에 전체 채팅 목록 요청", res.data.list);
      setMessageList([...res.data.list]);
    });
  }, []);

  const connect = () => {
    client.connect(headers, onConnected, onError);
    console.log("채팅방 연결");
  };

  // console.log("채팅 데이터 리스트", messageList);

  const onConnected = () => {
    console.log("연결됨");
    client.subscribe(
      `/sub/message/${params}`,
      (message) => {
        // console.log("연결 성공?!", message);
        if (message.body) {
          const new_Data = JSON.parse(message.body);
          console.log("new_Data", new_Data.message);
          // messageList.push(new_Data);
          console.log(messageList);
          setMessageList([...messageList, new_Data]);
          window.location.reload();
        } else {
          alert("메세지가 없습니다.");
        }
      }
      // headers
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const sendMessage = () => {
    client.send(
      `/pub/message/${params}`,
      headers,
      JSON.stringify({
        // channel_Id: parseInt(params),
        message: message,
      })
    );
    setMessage("");
    window.location.reload();
  };
  return (
    <ChattingListWrapper>
      <MessageListWrapper>
        {messageList.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            nickname={message.nickname}
            myMessage={message.username === username ? true : false}
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
  /* background-color: red; */
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
    outline-color: ${(props) => props.theme.palette.blue};
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
