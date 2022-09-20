import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReuseBtn from '../reusable/ReuseBtn';
import { clearAll, clearDialogue } from '../../shared/redux/modules/modalSlice';
import { removeMatchThunk } from '../../shared/redux/modules/matchSlice';

const DialRemoveMatch = () => {
  const dispatch = useDispatch();
  const dialData = useSelector ((state) => state.modal.dialogueData);
  const cancel = () => {
    dispatch(clearDialogue());
  }
  const remove = () => {
    dispatch(removeMatchThunk(dialData.matchId));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 게시물을 삭제하시겠어요? ⚠️</DialMessageTitle>
        <DialMessageExtra>삭제 시, 채팅방도 함께 삭제됩니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'danger'} content={'삭제'} clickEvent={remove} />
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