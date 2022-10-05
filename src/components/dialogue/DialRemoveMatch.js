import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { leaveChatThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialRemoveMatch = () => {
  const dispatch = useDispatch();
  const dialData = useSelector ((state) => state.modal.dialogueData);
  const cancel = () => {
    dispatch(clearDialogue());
  }
  const leaveChatRoom = () => {
    dispatch(leaveChatThunk(dialData.matchId));
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 채팅방을 나가시겠어요? ⚠️</DialMessageTitle>
        {dialData.isHost ? 
          <DialMessageExtra>퇴장 시, 모집 글도 함께 삭제됩니다</DialMessageExtra>
          :
          <DialMessageExtra>본 작업은 되돌릴 수 없습니다</DialMessageExtra>
        }
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'danger'} content={'나가기'} clickEvent={leaveChatRoom} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialRemoveMatch;