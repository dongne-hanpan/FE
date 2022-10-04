import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { reservedChatThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';


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
`