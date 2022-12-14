import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyLeave = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« λκ°κΈ° λΆκ° π«</DialMessageTitle>
        <DialMessageExtra>κ²°κ³Ό μλ ₯μ μλ£ν΄μΌ λκ° μ μμ΅λλ€.</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'νμΈ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyLeave;