import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';

const DialConfLogin = ({dialData}) => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
  }
  const showLogin = () => {
    dispatch(setModal({modalType: 'login'}));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>⚠️ 로그인이 필요합니다 ⚠️</DialMessageTitle>
        <DialMessageExtra>지금 로그인 하시겠습니까?</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'normal'} content={'로그인 하기'} clickEvent={showLogin} />
        <ReuseBtn styleType={'danger'} content={'취소'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfLogin;

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