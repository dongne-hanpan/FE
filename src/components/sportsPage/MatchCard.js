import React from 'react';
import styled, {css} from 'styled-components';
import ReuseBadge from '../y_reusable/ReuseBadge';
import ReuseBtn from '../y_reusable/ReuseBtn';


const MatchCard = ({matchState}) => {
  return(
    <MatchComp matchState={matchState}>
      <MatchDate matchState={matchState}>
        <div>
          <span className="matchDay">2022.08.27 (토)</span>
          <span className="matchTime">11:00 ~ 12:00</span>
          <span className="matchPlace">동작 볼링장</span>
        </div>
        <ReuseBadge level={'중급'} />
      </MatchDate>
      <MatchBtns>
        <div className="matchIntake"><span>3</span>/4 명</div>
        {matchState === 'done' ? 
          <ReuseBtn styleType={'done'} content={'완 료'} />
          :
          <ReuseBtn styleType={'shrink'} content={'연락하기'} />
        }
      </MatchBtns>
    </MatchComp>
  )
};

export default MatchCard;


const MatchComp = styled.li`
  width: 700px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  margin-bottom: 20px;
  border-radius: 1rem;
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  background-color: ${({theme}) => theme.colors.background_light};
  ${({matchState,theme}) => {
    if(matchState === 'reserved'){
      return css`
      border: 2px solid ${theme.colors.skyblue};
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchState === 'recruit'){
      return css`
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchState === 'done'){
      return css`
      color: ${theme.colors.gray};
      `
    }
  }}
`

const MatchDate = styled.div`
  display: flex;
  align-items: center;
  .matchDay{
    font-size: ${({theme}) => theme.fontSize.font_24};
    font-weight: ${({theme}) => theme.fontWeight.bold};
    margin-right: 10px;
  }
  .matchTime{
    margin-right: 10px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    color: ${({matchState,theme}) => matchState === 'done' ? theme.colors.gray : theme.colors.darkgray };
  }
  .matchPlace{
    margin-right: 10px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    font-size: ${({theme}) => theme.fontSize.font_20};
  }
  .badge{
    font-size: ${({theme}) => theme.fontSize.font_12};
  }
`
  const MatchBtns = styled.div`
  display: flex;
  .matchIntake{
    margin-right: 14px;
    font-size: ${({theme}) => theme.fontSize.font_20};
    font-weight:${({theme}) => theme.fontWeight.bold};
  }
  ${({matchState, theme}) => {
    if(matchState === 'done'){
      return css`
      color: ${theme.colors.gray};
      `
    }
  }}
`

