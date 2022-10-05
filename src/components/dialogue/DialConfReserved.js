import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import { getChatDataThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfReserved = () => {
  const dispatch = useDispatch();
  const nowChatId = useSelector((state) => state.modal.dialogueData.matchId);
  const cancel = () => {
    dispatch(getChatDataThunk(nowChatId));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 모집 완료 🎉</DialMessageTitle>
        <DialMessageExtra>나의 결과, 상대 후기 입력이 가능합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfReserved;