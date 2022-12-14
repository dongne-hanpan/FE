import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyChatExist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cancel = () => {
    navigate('/mypage');
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« μ‘΄μ¬νμ§ μλ λ°©μλλ€ π«</DialMessageTitle>
        <DialMessageExtra>λ²νΌμ λλ₯΄λ©΄ λ§μ΄νμ΄μ§λ‘ μ΄λν©λλ€</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'λ§μ΄ νμ΄μ§ κ°κΈ°'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyChatExist;