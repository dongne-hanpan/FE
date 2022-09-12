import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeather } from '../../shared/weather';
import sunny from '../../asset/weather/sunny.png';
import cloud from '../../asset/weather/cloud.png';
import drizzle from '../../asset/weather/drizzle.png';
import rain from '../../asset/weather/rain.png';
import snow from '../../asset/weather/snow.png';
import thunder from '../../asset/weather/thunder.png';


const ReuseWeather = () => {
  // 800은 clear
  // 800~는 구름
  // 700대는 흐림
  // 600대는 눈
  // 500대는 큰 비
  // 200대는 뇌우
  const weatherRouter = (weatherId) => {
    if(weatherId === 800){
      return [sunny,'맑음'];
    } else if(weatherId > 800){
      return [cloud,'구름'];
    } else if(700 <= weatherId < 800){
      return [drizzle,'흐림'];
    } else if(600 <= weatherId < 700){
      return [snow,'눈'];
    } else if(500<= weatherId < 600){
      return [rain,'비'];
    } else if(200<= weatherId < 300){
      return [thunder,'뇌우'];
    }
  }
  //날씨 관련
  const [weather,setWeather] = useState([]);
  useEffect(() => {
    getWeather().then((res) => {
      const weatherId = res.weather[0].id;
      const weatherSrc = weatherRouter(weatherId);
      const weaterTemp = Math.round(res.main.temp * 10)/10;
      setWeather([...weatherSrc, weaterTemp]);
    });
  },[])

  return(
    <>
    {weather.length !== 0 ? 
      <WeatherComp>
        <WeatherImg src={weather[0]} alt="weather emoji"/>
        <WeatherContent>{weather[1]}</WeatherContent>
        <WeatherContent>{weather[2]} 도</WeatherContent>
      </WeatherComp>
    :<></>}
    </>
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



