import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import { clearAlermStatus } from '../../shared/redux/modules/alermSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfApply = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAlermStatus());
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 신청 완료 🎉</DialMessageTitle>
        <DialMessageExtra>신청이 수락되면 채팅방에 초대됩니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfApply;