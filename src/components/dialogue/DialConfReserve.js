import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reservedChatThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfReserve = () => {
  const dispatch = useDispatch();
  const nowChatId = useSelector((state) => state.modal.dialogueData.matchId);
  const doReserve = () => {
    dispatch(reservedChatThunk(nowChatId));
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>✅ 모집을 완료하겠습니까? ✅</DialMessageTitle>
        <DialMessageExtra>더 이상 인원 변경이 불가합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'모집 완료'} clickEvent={doReserve} />
      </DialBtns>
    </>
  )
};

export default DialConfReserve;