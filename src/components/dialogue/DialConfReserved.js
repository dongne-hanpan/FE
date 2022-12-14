import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import { getChatDataThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfReserved = () => {
  const dispatch = useDispatch();
  const nowChatId = useSelector((state) => state.modal.dialogueData.matchId);
  const cancel = () => {
    dispatch(getChatDataThunk(nowChatId));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π λͺ¨μ§ μλ£ π</DialMessageTitle>
        <DialMessageExtra>λμ κ²°κ³Ό, μλ νκΈ° μλ ₯μ΄ κ°λ₯ν©λλ€</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'νμΈ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfReserved;