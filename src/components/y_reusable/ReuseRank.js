import React from 'react'
import styled from 'styled-components';
import ReuseProfile from './ReuseProfile';


const ReuseRank = ({type, content, userProfile, username}) => {
  return(
    <RankComp>
      {type === 'avg' ?
        <div className="rankInfo">
          <div className="rankName"> 우리 동네 점수 왕</div>
          <div className="rankScore"> {content} 점</div>
        </div>
        :
        <div className="rankInfo">
          <div className="rankName"> 우리 동네 매치 왕</div>
          <div className="rankScore"> {content} 회</div>
        </div>
      }
      <ReuseProfile imgSrc={userProfile} content={username}/>
    </RankComp>
  )
}

export default ReuseRank;

const RankComp = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 20px;
  border-radius: 1rem;
  background-color: var(--color-background-light);
  filter: drop-shadow(0px 0px 0px var(--color-gray));
  .rankInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rankName{
    font-size: var(--font-20);
  }
  .rankScore{
    height: 0px;
    overflow-y: hidden;
    font-size: var(--font-26);
    font-weight: 700;
  }
  &:hover{
    .rankName{
      margin-bottom: 10px;
    }
    .rankScore{
      height: 30px;
      transition: all 0.4s ease-out;
    }
    height: 120px;
    transition: all 0.4s ease-in-out;
    filter: drop-shadow(4px 2px 1px var(--color-gray));
  }
`
