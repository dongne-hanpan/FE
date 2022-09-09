import React from 'react'
import styled from 'styled-components';
import ReuseProfile from './ReuseProfile';


const ReuseRank = ({ contentTitle, content, userProfile, username}) => {
  return(
    <RankComp userProfile={userProfile}>
      <RankInfo>
        <RankName>{contentTitle}</RankName>
        <RankScore> {content}</RankScore>
      </RankInfo>
      {userProfile ? 
        <ReuseProfile imgSrc={userProfile} content={username}/> : <></>
      }
    </RankComp>
  )
}

export default ReuseRank;

const RankComp = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: ${({userProfile}) => userProfile ? 'space-between':'center'};
  align-items: center;
  padding: 0px 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  &:hover{
    height: 120px;
    transition: all 0.4s ease-in-out;
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray});
  }
`
const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const RankName = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_20};
  ${RankComp}:hover &{
    margin-bottom: 10px;
  }
`
const RankScore = styled.div`
  height: 0px;
  overflow-y: hidden;
  font-size: ${({theme}) => theme.fontSize.font_26};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  ${RankComp}:hover &{
    height: 30px;
    transition: all 0.4s ease-out;
  }
`
