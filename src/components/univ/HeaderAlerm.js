import React from 'react';
import styled from 'styled-components';
import red from '../../asset/red.png'
import ReuseBtn from '../y_reusable/ReuseBtn';

const HeaderAlerm = ({alermType, checked, content}) => {
  return(
    <AlermComp>
      <AlermImgBox>
        {checked ? <AlermImg src={red} alt='checkToggle'/>: <></>}
      </AlermImgBox>
      <AlermMsg>
        {content}
      </AlermMsg>
      {alermType === 'choose' ? 
      <AlermBtnBox>
        <ReuseBtn direc={'horiz'} styleType={'small'} content={'수락'} />
        <ReuseBtn direc={'horiz'} styleType={'small'} content={'정보'} />
      </AlermBtnBox>
      :<></>
      }
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