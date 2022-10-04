import React from 'react'
import styled from 'styled-components';
import ReuseProfile from './ReuseProfile';
import Progress from '../sportsPage/Progress';


const ReuseTemperature = ({type, type2, data, userProfile, username}) => {
  const titleRouter = () => {
    if(type === 'rank'){
      if(type2 === 'score'){
        return `우리 동네 점수 왕`
      } else if(type2 === 'count'){
        return `우리 동네 매치 왕`
      } else if(type2 === 'temper'){
        return `우리 동네 매너 왕`
      }
    } else if (type === 'personal'){
      if(type2 === 'score'){
        return `평균 점수`
      } else if(type2 === 'count'){
        return `매치 수`
      } else if(type2 === 'temper'){
        return `매너 온도`
      }
    }
  }
  const unitRouter = () => {
      if(type2 === 'score'){
        return `점`
      } else if(type2 === 'count'){
        return `회`
      } else if(type2 === 'temper'){
        return `도`
      }
  }
  return(
    <TemperatureComp type={type}>
      <RankName>{titleRouter()}</RankName>
      <Progress data={data ? data: 0} type={type2} />
      <RankInfo>
        {userProfile ? <ReuseProfile imgSrc={userProfile} content={username} />: <></>}
        <Temperture type={type}>{ data ? data: 0 }{unitRouter()}</Temperture>
      </RankInfo>
    </TemperatureComp>
  )
};

export default ReuseTemperature;


const TemperatureComp = styled.div`
  position: relative;
  width: 100px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({type}) => type === 'rank' ? '10px 20px' :'20px'};
  margin-left: 6px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  &:hover{
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray});
    transition: all 0.4s ease-in-out;
  }
`
const RankName = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_14};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  text-align: center;
  margin-bottom: 4px;
`
const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Temperture = styled.div`
  font-size: ${({type, theme}) => type === 'rank' ? theme.fontSize.font_14 : theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`