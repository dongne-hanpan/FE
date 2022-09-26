import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReuseBtn from '../reusable/ReuseBtn';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { leaveChatThunk } from '../../shared/redux/modules/chatSlice';


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
      <DialBtns>
        <ReuseBtn styleType={'danger'} content={'나가기'} clickEvent={leaveChatRoom} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialRemoveMatch;

const DialMessages = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DialMessageTitle = styled.div`
  margin-bottom: 12px;
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
  const DialMessageExtra = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.light};
`
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`