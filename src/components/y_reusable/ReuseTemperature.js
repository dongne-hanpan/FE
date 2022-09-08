import React from 'react'
import styled from 'styled-components';
import Progress from '../sportsPage/Progress';
import ReuseProfile from './ReuseProfile';


const ReuseTemperature = ({tempType,username, userProfile, temp}) => {
  return(


    <TemperatureComp tempType={tempType}>
      {tempType === 'rank' ? 
      <div className="rankName">동네 한판 <br/> 매너 왕</div>
      : 
      <div className="rankName">매너 온도</div>
      }
      <Progress data={temp} />
      <div className="rankInfo">
        {userProfile ? 
        <ReuseProfile imgSrc={userProfile} content={username}/>
        :<></>
        }
        <div className="temperture">{temp} 도</div>
      </div>
    </TemperatureComp>
  )
}

export default ReuseTemperature;

const TemperatureComp = styled.div`
  position: relative;
  width: 100px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({tempType}) => tempType === 'rank' ? '10px 20px' :'20px'};
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  .rankName{
    font-size: ${({theme}) => theme.fontSize.font_14};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    text-align: center;
    margin-bottom: 4px;
  }
  .rankInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    .temperture{
      font-size: ${({tempType,theme}) => tempType === 'rank' ? theme.fontSize.font_14 : theme.fontSize.font_16};
      font-weight: ${({theme}) => theme.fontWeight.medium};
    }
  }
  &:hover{
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray};);
    transition: all 0.4s ease-in-out;
  }
`
