import React from 'react';
import styled from 'styled-components';

const Progress = ({data, type}) => {
  const dataCalc = () => {
    if(type === 'score'){
      return <HighLight height={(data/300*100) + '%'}/>
    } else if(type === 'count'){
      return <HighLight height={'100%'}/>
    } else if(type === 'temper'){
      return <HighLight height={(data*10) + '%'}/>
    }
  }
  return(
    <ProgressBar>
      <Dot />
      {dataCalc()}
    </ProgressBar>
  )
}


export default Progress;

const ProgressBar = styled.div`
  position: absolute;
  top: 54px;
  width: 12px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.orange_pale};
  z-index: -1;
`
const Dot = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  top: 8px;
  background-color: ${({theme}) => theme.colors.red_light};
  border-radius: 40px;
  z-index: 2;
`
const HighLight = styled.div`
  width: 12px;
  height: ${({height}) => height};
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.orange};
  transition: 1s width;
`