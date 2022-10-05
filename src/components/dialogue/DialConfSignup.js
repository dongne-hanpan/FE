import React from 'react';
import { useDispatch } from 'react-redux';
import { clearDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfSignup = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
    dispatch(setModal({modalType: 'login'}))
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 회원가입 완료 🎉</DialMessageTitle>
        <DialMessageExtra>감사합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfSignup;