import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll, clearDialogue } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


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
      <DialBtnsTwo>
        <ReuseBtn styleType={'danger'} content={'나가기'} clickEvent={remove} />
        <ReuseBtn styleType={'normal'} content={'취소'} clickEvent={cancel} />
      </DialBtnsTwo>
    </>
  )
};

export default DialConfRemove;