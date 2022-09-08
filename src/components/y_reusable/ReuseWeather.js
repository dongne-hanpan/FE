import React from 'react';
import styled from 'styled-components';


const ReuseWeather = ({imgSrc}) => {
  //데이터 값 들어오면 프론트에서 처리
  return(
    <WeatherComp>
      <WeatherImg src={imgSrc} alt="weather emoji"/>
      <WeatherContent>맑음</WeatherContent>
      <WeatherContent>22 도</WeatherContent>
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
`
const WeatherImg = styled.img`
  width: 50px;
  margin-bottom: 15px;
`
const WeatherContent = styled.div`
  color: ${({theme}) => theme.colors.background};
  font-weight: ${({theme}) => theme.fontWeight.light};
`



