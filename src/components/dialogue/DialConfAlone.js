import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { reservedChatThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';

const DialConfAlone = () => {
  const dispatch = useDispatch();
  const nowChatId = useSelector((state) => state.modal.dialogueData.matchId);
  const doReserve = () => {
    dispatch(reservedChatThunk(nowChatId));
  }
  const cancel = () => {
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 모집을 완료하겠습니까? ⚠️</DialMessageTitle>
        <DialMessageExtra>현재 본인 이외의 참여인원이 없습니다</DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'모집 완료'} clickEvent={doReserve} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialConfAlone;