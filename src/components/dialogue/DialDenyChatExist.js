import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { useDispatch } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import { useNavigate } from 'react-router';


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
        <DialMessageTitle>🚫 존재하지 않는 방입니다 🚫</DialMessageTitle>
        <DialMessageExtra>버튼을 누르면 마이페이지로 이동합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'마이 페이지 가기'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyChatExist;


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