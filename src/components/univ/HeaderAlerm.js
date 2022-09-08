import React from 'react';
import styled from 'styled-components';
import green from '../../asset/green.png'
import red from '../../asset/red.png'

const HeaderAlerm = ({checked}) => {
  //언제 녹색이고 언제 빨간색?
  return(
    <AlermComp>
      <div className="alermImg">
        {checked ? 
        <img src={red} alt='checkToggle'/>
        :
        <></>
        }
      </div>
      <div className="alermMsg">
        최영준 님이 친구 신청을 보냈습니다.
        </div>
    </AlermComp>
  )
};

export default HeaderAlerm;


const AlermComp = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  .alermImg{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    & img{
      width: 10px;
    }
  }
  .alermMsg{
    padding-left: 100px;
    font-size: ${({theme}) => theme.fontSize.font_14};
    color: ${({theme}) => theme.colors.background};
  }

`


