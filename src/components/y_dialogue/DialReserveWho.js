import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll} from '../../shared/redux_d/modules/modalSlice';
import ReuseInput from '../y_reusable/ReuseInput';


const DialReserveWho = () => {
  const dispatch = useDispatch();
  const dialData = useSelector((state) => state.modal.dialogueData);
  const cancel = () => {
    dispatch(clearAll());
  };
  return(
    <>
      <DialMessages>
        <DialMessageTitle>✅ 예약하기 ✅</DialMessageTitle>
        <DialMessageExtra>함께 할 유저를 선택해주세요</DialMessageExtra>
      </DialMessages>
      <CheckBoxContainer>
        {dialData.participants.map((each) => 
        <CheckBox key={each.participantId}>
          <Check type='checkbox' value={each.nickname} />
          <CheckName>{each.nickname}</CheckName>
        </CheckBox>
        )}
      </CheckBoxContainer>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'예약 확정'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialReserveWho;


const DialMessages = styled.div`
  width: 100%;
  height: 100px;
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
const CheckBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
`
const CheckBox = styled.div`
  margin: 0px 4px;
`
const Check = styled.input``
const CheckName = styled.span``
const DialBtns = styled.div`
  width: 100%;
  height: 50px;
`