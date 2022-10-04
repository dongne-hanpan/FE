import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearAll, clearDialogue } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';

const DialConfLeave = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
  }
  const remove = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 현재 창에서 나가시겠어요? ⚠️</DialMessageTitle>
        <DialMessageExtra>지금 나가면 내용이 저장되지 않습니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'danger'} content={'나가기'} clickEvent={remove} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfLeave;

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