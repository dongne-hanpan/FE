import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import { useDispatch } from 'react-redux';
import { clearAll} from '../../shared/redux_d/modules/modalSlice';

const DialConfApply = ({dialData}) => {
  const dispatch = useDispatch();
  const cancel = () => {
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
  font-size: var(--font-16);
  font-weight: 500;
  margin-bottom: 12px;
`
  const DialMessageExtra = styled.div`
  font-size: var(--font-16);
  font-weight: 300;
`
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
`