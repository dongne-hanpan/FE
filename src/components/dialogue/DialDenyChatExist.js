import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyChatExist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cancel = () => {
    navigate('/mypage');
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 존재하지 않는 방입니다 🚫</DialMessageTitle>
        <DialMessageExtra>버튼을 누르면 마이페이지로 이동합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'마이 페이지 가기'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyChatExist;