import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import { cancelApplyThunk } from '../../shared/redux/modules/alermSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialDenyContactAgain = () => {
  const dispatch = useDispatch();
  const dialData = useSelector((state) => state.modal.dialogueData);
  const cancel = () => {
    dispatch(clearAll());
  }
  const cancelApply = () => {
    const matchId = dialData.matchId;
    dispatch(cancelApplyThunk(matchId))
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 이미 신청 되었습니다 🚫</DialMessageTitle>
        <DialMessageExtra> 신청을 취소하시겠습니까? </DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'danger'} content={'신청 취소'} clickEvent={cancelApply} />
        <ReuseBtn styleType={'normal'} content={'닫기'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialDenyContactAgain;