import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialDenyEnterChatroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goMyPage = () => {
    navigate('/mypage');
    dispatch(clearDialogue());
  }
  const goChatPage = () => {
    navigate('/chat');
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π« μμ₯μ΄ κ±°λΆλμμ΅λλ€ π«</DialMessageTitle>
        <DialMessageExtra> μ΄λλμ§ μμ μ±ν λ°©μλλ€ </DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'μ±νμ°½ κ°κΈ°'} clickEvent={goChatPage} />
        <ReuseBtn styleType={'normal'} content={'λ§μ΄νμ΄μ§ κ°κΈ°'} clickEvent={goMyPage} />
      </DialBtnsTwo>
    </>
  )
};

export default DialDenyEnterChatroom;