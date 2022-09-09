import React from 'react';
import styled from 'styled-components';
import green from '../../asset/green.png'
import red from '../../asset/red.png'

const HeaderAlerm = ({checked}) => {
  //언제 녹색이고 언제 빨간색?
  return(
    <AlermComp>
      <AlermImgBox>
        {checked ? <AlermImg src={red} alt='checkToggle'/>:<></>}
      </AlermImgBox>
      <AlermMsg>
        최영준 님이 친구 신청을 보냈습니다.
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
  padding-left: 100px;
  font-size: ${({theme}) => theme.fontSize.font_14};
  color: ${({theme}) => theme.colors.background};
`