import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyResult = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 결과 입력 불가 🚫</DialMessageTitle>
        <DialMessageExtra>결과 입력은 예약확정이 된 이후에 가능합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyResult;