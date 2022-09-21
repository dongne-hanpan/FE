import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { useDispatch } from 'react-redux';
import { clearDialogue, setModal } from '../../shared/redux/modules/modalSlice';

const DialConfSignup = ({dialData}) => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
    dispatch(setModal({modalType: 'login'}))
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 회원가입 완료 🎉</DialMessageTitle>
        <DialMessageExtra>감사합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfSignup;

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