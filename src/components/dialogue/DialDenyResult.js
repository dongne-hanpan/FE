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


const DialDenyResult = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« κ²°κ³Ό μλ ₯ λΆκ° π«</DialMessageTitle>
        <DialMessageExtra>κ²°κ³Ό μλ ₯μ μμ½νμ μ΄ λ μ΄νμ κ°λ₯ν©λλ€</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'νμΈ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyResult;