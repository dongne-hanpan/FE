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
      permit: isAccept === '거절하기' ? false : true,
    }
    dispatch(permitAlermThunk(permitData));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🙂 요청을 수락하시겠습니까? 🙂</DialMessageTitle>
        <DialMessageExtra>수락 시 해당 유저가 채팅방에 초대됩니다</DialMessageExtra>
      </DialMessages>
      <DialBtnsTwo>
        <ReuseBtn styleType={'normal'} content={'수락하기'} clickEvent={sendPermit} />
        <ReuseBtn styleType={'danger'} content={'거절하기'} clickEvent={sendPermit} />
      </DialBtnsTwo>
    </>
  )
};

export default DialPermit;