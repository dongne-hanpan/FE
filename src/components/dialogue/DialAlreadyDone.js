import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialAlreadyDone = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« λμ λΆκ° π«</DialMessageTitle>
        <DialMessageExtra>μ΄λ―Έ μλ£λ λ°©μλλ€</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'νμΈ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialAlreadyDone;