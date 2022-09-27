import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import { getChatDataThunk } from '../../shared/redux/modules/chatSlice';
import ReuseBtn from '../reusable/ReuseBtn';


const DialConfReserved = ({dialData}) => {
  const dispatch = useDispatch();
  const nowChatId = useSelector((state) => state.modal.dialogueData.matchId);
  const cancel = () => {
    dispatch(getChatDataThunk(nowChatId));
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🎉 모집 완료 🎉</DialMessageTitle>
        <DialMessageExtra>나의 결과, 상대 후기 입력이 가능합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfReserved;


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