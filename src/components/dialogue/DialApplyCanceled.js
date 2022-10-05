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


const DialApplyCanceled = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAlermStatus());
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 신청 취소 🚫</DialMessageTitle>
        <DialMessageExtra>이미 취소된 신청입니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialApplyCanceled;