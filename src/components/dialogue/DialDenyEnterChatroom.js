import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { useNavigate } from 'react-router';


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
      <DialBtns>
        <ReuseBtn styleType={'normal'} content={'채팅창 가기'} clickEvent={goChatPage} />
        <ReuseBtn styleType={'normal'} content={'마이페이지 가기'} clickEvent={goMyPage} />
      </DialBtns>
    </>
  )
};

export default DialDenyEnterChatroom;


const DialMessages = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DialMessageTitle = styled.div`
  margin-bottom: 12px;
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const DialMessageExtra = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.light};
`
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`