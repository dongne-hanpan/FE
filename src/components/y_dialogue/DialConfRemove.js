import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ReuseBtn from '../y_reusable/ReuseBtn';
import { clearAll, clearDialogue } from '../../shared/redux_d/modules/modalSlice';

const DialConfRemove = ({dialData}) => {
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
        <DialMessageTitle>⚠️ 게시물을 삭제하시겠어요? ⚠️</DialMessageTitle>
        <DialMessageExtra>지금 나가면 내용이 저장되지 않습니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'danger'} content={'나가기'} clickEvent={remove} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfRemove;

const DialMessages = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DialMessageTitle = styled.div`
  font-size: var(--font-16);
  font-weight: 500;
  margin-bottom: 12px;
`
  const DialMessageExtra = styled.div`
  font-size: var(--font-16);
  font-weight: 300;
`
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`