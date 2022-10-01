import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import { useDispatch } from 'react-redux';
import { clearAll} from '../../shared/redux/modules/modalSlice';


const DialConfComment = ({dialData}) => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 후기 입력 완료 🎉</DialMessageTitle>
        <DialMessageExtra> 감사합니다 </DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfComment;


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