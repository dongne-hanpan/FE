import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ReuseBtn from '../reusable/ReuseBtn';
import { clearDialogue } from '../../shared/redux/modules/modalSlice';
import { permitAlermThunk } from '../../shared/redux/modules/alermSlice';

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
      <DialBtns>
        <ReuseBtn styleType={'normal'} content={'수락하기'} clickEvent={sendPermit} />
        <ReuseBtn styleType={'danger'} content={'거절하기'} clickEvent={sendPermit} />
      </DialBtns>
    </>
  )
};

export default DialPermit;

const DialMessages = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DialMessageTitle = styled.div`
  margin-bottom: 12px;
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
  const DialMessageExtra = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.light};
`
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`