import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import { cancelApplyThunk } from '../../shared/redux/modules/alermSlice';


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
      <DialBtns>
        <ReuseBtn styleType={'danger'} content={'신청 취소'} clickEvent={cancelApply} />
        <ReuseBtn styleType={'normal'} content={'닫기'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyContactAgain;


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