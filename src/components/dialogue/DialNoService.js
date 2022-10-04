import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';


const DialNoService = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 선택 불가 🚫</DialMessageTitle>
        <DialMessageExtra>해당 스포츠는 준비 중입니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialNoService;


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