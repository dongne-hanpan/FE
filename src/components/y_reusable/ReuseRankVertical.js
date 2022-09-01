import React from 'react'
import styled from 'styled-components';
import Progress from '../sportsPage/Progress';
import ReuseProfile from './ReuseProfile';


const ReuseRankVertical = ({content, userProfile}) => {
  return(
    <RankCompVertical>
      <div className="rankName">동네 한판 <br/> 매너 왕</div>
      <Progress data={69} />
      <div className="rankInfo">
        <ReuseProfile imgSrc={userProfile} content={'성 원'}/>
        <div className="temperture">69 도</div>
      </div>
    </RankCompVertical>
  )
}

export default ReuseRankVertical;

const RankCompVertical = styled.div`
  position: relative;
  width: 100px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  border-radius: 1rem;
  background-color: var(--color-background-light);
  filter: drop-shadow(0px 0px 0px var(--color-gray));
  .rankName{
    font-size: var(--font-16);
    font-weight: 500;
    text-align: center;
    margin-bottom: 4px;
  }
  .rankInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    .temperture{
      font-size: var(--font-14);
      font-weight: 500;
    }
  }
  &:hover{
    filter: drop-shadow(4px 2px 1px var(--color-gray));
    transition: all 0.4s ease-in-out;
  }
`
