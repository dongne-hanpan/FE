import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { permitAlermThunk } from '../../shared/redux/modules/alermSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtnsTwo
} from '../../shared/css/dialogueStyle';


const DialPermit = () => {
  const dispatch = useDispatch();
  const dialData = useSelector((state) => state.modal.dialogueData.data);

  const sendPermit = (e) => {
    const isAccept = e.target.innerText;
    const permitData = {
      match_id: dialData.match_id,
      nickname: dialData.sender,
      permit: isAccept === 'κ±°μ νκΈ°' ? false : true,
    }
    dispatch(permitAlermThunk(permitData));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>π μμ²­μ μλ½νμκ² μ΅λκΉ? π</DialMessageTitle>
        <DialMessageExtra>μλ½ μ ν΄λΉ μ μ κ° μ±νλ°©μ μ΄λλ©λλ€</DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'μλ½νκΈ°'} clickEvent={sendPermit} />
        <ReuseBtn styleType={'danger'} content={'κ±°μ νκΈ°'} clickEvent={sendPermit} />
      </DialBtnsTwo>
    </>
  )
};

export default DialPermit;