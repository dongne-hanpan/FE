import React from 'react';
import { useDispatch } from 'react-redux';
import {clearAll} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyFileUpload = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« μλ‘λ μ€ν¨ (ν¬κΈ° μ΄κ³Ό) π«</DialMessageTitle>
        <DialMessageExtra>128mb μ΄νμ μ΄λ―Έμ§ νμΌλ§ κ°λ₯ν©λλ€</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'νμΈ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyFileUpload;