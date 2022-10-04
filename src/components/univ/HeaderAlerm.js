import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { filterAlermData } from '../../shared/redux/modules/alermSlice';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import red from '../../asset/red.png'


const HeaderAlerm = ({data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkApplicant = () => {
    const senderData = {
      nickname: data.sender,
      profileImage: data.sender_ProfileImage,
      userLevel: data.sender_Level,
      averageScore: data.sender_AverageScore,
      matchCount: data.sender_MatchCnt,
      mannerPoint: data.sender_MannerPoint,
    }
    dispatch(setModal({modalType: 'userWatch', userData: senderData}))
  }

  const showPermitDial = (e) => {
    const {ariaLabel} = e.target;
    if(ariaLabel === 'userDetail' || ariaLabel === 'moveToChat'){
      return
    }
    if(data.alarmType === 'apply'){
      dispatch(setDialogue({dialType: 'permit', data: data}))
    }
  }
  const moveChatroom = () => {
    navigate(`/chat/${data.match_id}`)
  }
  const alermRouter = () => {
    if(data.alarmType === 'permit'){
      return `${data.match_date} 일자의 신청이 수락되었습니다`
    } else if(data.alarmType === 'deny'){
      return `${data.match_date} 일자의 신청이 거절되었습니다`
    } else if(data.alarmType === 'apply'|| data.nickname !== undefined){
      return `${data.sender} 님의 신청이 도착했습니다`
    }
  }
  const alermBtnRouter = () => {
    if(data.alarmType === 'apply'){
      return <AlermBtn aria-label='userDetail' onClick={checkApplicant}><Icon aria-label='userDetail' className='fa-solid fa-user' /></AlermBtn>
    } else if(data.alarmType === 'permit'){
      return <AlermBtn aria-label='moveToChat' onClick={moveChatroom}><Icon aria-label='moveToChat' className='fa-solid fa-right-to-bracket' /></AlermBtn>
    } else if(data.alarmType === 'deny'){
      return 
    }
  }
  const removeThisAlerm = () => {
    dispatch(filterAlermData(data.match_id));
  }
  
  return(
    <AlermComp onClick={data.alarmType === 'apply' ? showPermitDial : removeThisAlerm}>
      <AlermImgBox>
        <AlermImg src={red} alt='checkToggle'/>
      </AlermImgBox>
      <Alerm>
        <AlermMsg>
          {alermRouter()}
        </AlermMsg>
        <AlermBtnBox>
          {alermBtnRouter()}
        </AlermBtnBox>
      </Alerm>
    </AlermComp>
  )
};

export default HeaderAlerm;

const AlermComp = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AlermImgBox = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  `
  const AlermImg = styled.img`
  width: 10px;
  justify-content: center;
  `
  const Alerm = styled.div`
  width: 100%;
  max-width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AlermMsg = styled.div`
  text-align: end;
  cursor: pointer;
  font-size: ${({theme}) => theme.fontSize.font_14};
  color: ${({theme}) => theme.colors.background};
`
const AlermBtnBox = styled.div`
  display: flex;
  margin-left: 10px;
`;
const AlermBtn = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${({theme}) => theme.fontSize.font_13};
  background-color: ${({theme}) => theme.colors.skyblue};
  border-radius: 1rem;
`
const Icon = styled.i`
`