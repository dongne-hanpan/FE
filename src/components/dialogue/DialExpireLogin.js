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


const DialExpireLogin = () => {
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
        <DialMessageTitle>⚠️ 로그인 시간이 만료되었습니다 ⚠️</DialMessageTitle>
        <DialMessageExtra>다시 로그인 하시겠어요?</DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'로그인 하기'} clickEvent={showLogin} />
        <ReuseBtn styleType={'danger'} content={'취소'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialExpireLogin;