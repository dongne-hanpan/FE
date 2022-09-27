import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { reservedChatThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';

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
      <DialBtns>
        <ReuseBtn styleType={'normal'} content={'모집 완료'} clickEvent={doReserve} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfAlone;

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