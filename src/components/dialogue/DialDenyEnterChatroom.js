import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialDenyEnterChatroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goMyPage = () => {
    navigate('/mypage');
    dispatch(clearDialogue());
  }
  const goChatPage = () => {
    navigate('/chat');
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 입장이 거부되었습니다 🚫</DialMessageTitle>
        <DialMessageExtra> 초대되지 않은 채팅 방입니다 </DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'채팅창 가기'} clickEvent={goChatPage} />
        <ReuseBtn styleType={'normal'} content={'마이페이지 가기'} clickEvent={goMyPage} />
      </DialBtnsTwo>
    </>
  )
};

export default DialDenyEnterChatroom;