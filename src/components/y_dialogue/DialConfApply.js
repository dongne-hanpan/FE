import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import { clearAll} from '../../shared/redux_d/modules/modalSlice';


const DialConfApply = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialData = useSelector((state) => state.modal.dialogueData);
  const cancel = () => {
    navigate(`/chat/${dialData.matchId}`)
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 신청 완료 🎉</DialMessageTitle>
        <DialMessageExtra>신청이 수락되면 채팅방에 초대됩니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfApply;


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
`