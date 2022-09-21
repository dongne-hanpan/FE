import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import red from '../../asset/red.png'
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';

const HeaderAlerm = ({data}) => {
  const dispatch = useDispatch();
  const { match_id, ...rest } = data;
  const [isChecked, setIsChecked] = useState(false);

  const checkApplicant = () => {
    if(!isChecked){
      setIsChecked(true)
    }
    dispatch(setModal({modalType: 'userWatch', userData: rest}))
  }

  const showPermitDial = (e) => {
    if(e.target.ariaLabel === 'userDetail'){
      return
    }
    dispatch(setDialogue({dialType: 'permit', data: data}))
  }
  return(
    <AlermComp onClick={showPermitDial}>
      <AlermImgBox>
        {isChecked ? <></> : <AlermImg src={red} alt='checkToggle'/>}
      </AlermImgBox>
      <AlermMsg>
        {data.nickname} 님의 매치 신청이 도착했습니다.
      </AlermMsg>
      <AlermBtnBox>
        <ReuseBtn name={'userDetail'} direc={'horiz'} styleType={'small'} content={'정보'} clickEvent={checkApplicant} />
      </AlermBtnBox>
    </AlermComp>
  )
};

export default HeaderAlerm;


const AlermComp = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
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
`
const AlermMsg = styled.div`
  width: 300px;
  margin-right: 10px;
  text-align: end;
  font-size: ${({theme}) => theme.fontSize.font_14};
  color: ${({theme}) => theme.colors.background};
`
const AlermBtnBox = styled.div`
  display: flex;
`;