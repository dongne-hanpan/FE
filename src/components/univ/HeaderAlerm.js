import React from 'react';
import styled from 'styled-components';
import green from '../../asset/green.png'
import red from '../../asset/red.png'
import ReuseBtn from '../y_reusable/ReuseBtn';

const HeaderAlerm = ({alermType, checked, content}) => {
  return(
    <AlermComp>
      <AlermImgBox>
        {checked ? <AlermImg src={red} alt='checkToggle'/>:<AlermImg src={green} alt='checkToggle'/>}
      </AlermImgBox>
      <AlermMsg>
        {content}
      {alermType === 'choose' ? 
      <AlermBtnBox>
        <ReuseBtn direc={'horiz'} styleType={'shrink'} content={'수락'} />
        <ReuseBtn direc={'horiz'} styleType={'shrink'} content={'정보'} />
      </AlermBtnBox>
      :<></>
      }
      </AlermMsg>
    </AlermComp>
  )
};

export default HeaderAlerm;


const AlermComp = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
`
const AlermImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`
const AlermImg = styled.img`
  width: 10px;
`
const AlermMsg = styled.div`
  padding-left: 60px;
  font-size: ${({theme}) => theme.fontSize.font_14};
  color: ${({theme}) => theme.colors.background};
`
const AlermBtnBox = styled.div`
  display: flex;
`;
const AlermBtnOK = styled.button`
  margin-left: 10px;
`;
  const AlermBtnInfo = styled.button`
  margin-left: 10px;
`;