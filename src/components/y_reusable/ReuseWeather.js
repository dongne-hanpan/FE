import React from 'react';
import styled from 'styled-components';


const ReuseWeather = ({imgSrc}) => {
  //데이터 값 들어오면 프론트에서 처리
  return(
    <WeatherComp>
      <img src={imgSrc} alt="weather emoji"/>
      <div>맑음</div>
      <div>22 도</div>
    </WeatherComp>
  )
};

export default ReuseWeather;

const WeatherComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 15px;
  & img{
    width: 50px;
    margin-bottom: 15px;
  }
  & div{
    color: var(--color-background);
    font-weight: 300;
  }
`



