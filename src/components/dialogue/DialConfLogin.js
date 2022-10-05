import React from 'react';
import { useDispatch } from 'react-redux';
import { clearDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialConfLogin = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
  }
  const showLogin = () => {
    dispatch(setModal({modalType: 'login'}));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 로그인이 필요합니다 ⚠️</DialMessageTitle>
        <DialMessageExtra>지금 로그인 하시겠습니까?</DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'로그인 하기'} clickEvent={showLogin} />
        <ReuseBtn styleType={'danger'} content={'취소'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialConfLogin;