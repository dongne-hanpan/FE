import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import { clearStatus } from '../../shared/redux/modules/alermSlice';


const DialConfApply = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearStatus());
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 신청 완료 🎉</DialMessageTitle>
        <DialMessageExtra>신청이 수락되면 채팅방에 초대됩니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfApply;


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