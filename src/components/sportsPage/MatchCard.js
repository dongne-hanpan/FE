import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';


const MatchCard = () => {
  return(
    <MatchComp>
      <MatchDate>
        <div>
          <span className="matchDay">2022.08.27 (토)</span>
          <span className="matchTime">11:00 ~ 12:00</span>
          <span className="matchPlace">동작 볼링장</span>
        </div>
        <div className="badge">입문</div>
      </MatchDate>
      <MatchBtns>
        <div className="matchIntake"><span>3</span>/4 명</div>
        <ReuseBtn content={'연락하기'} />
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
  filter: drop-shadow(0px 0px 0px var(--color-gray));
  background-color: var(--color-background-light);
  &:hover{
    filter: drop-shadow(8px 4px 2px var(--color-gray));
    transition: filter 0.3s ease-in;
  }
`

const MatchDate = styled.div`
  display: flex;
  align-items: center;
  .matchDay{
    font-size: var(--font-24);
    font-weight: 700;
    margin-right: 10px;
  }
  .matchTime{
    margin-right: 10px;
    color: var(--color-darkgray);
    font-weight: 700;
  }
  .matchPlace{
    margin-right: 10px;
    font-weight: 700;
    font-size: var(--font-20);
  }
  .badge{
    font-size: 12px;
  }
`
  const MatchBtns = styled.div`
  display: flex;
  .matchIntake{
    margin-right: 14px;
    font-size: var(--font-20);
    font-weight: 700;
  }
`

