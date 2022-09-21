import React from 'react'
import styled from 'styled-components';
import ReuseProfile from './ReuseProfile';


const ReuseRank = ({ contentTitle1, content1, contentTitle2, content2, userProfile, username }) => {
  return(
    <RankComp>
      <RankAvg userProfile={userProfile}>
        <RankInfo>
          <RankAvgName>{contentTitle1}</RankAvgName>
          <RankScore>{content1}</RankScore>
        </RankInfo>
        {userProfile ? 
          <ReuseProfile imgSrc={userProfile} content={username}/> : <></>
        }
      </RankAvg>
      <RankSpace />
      <RankCnt userProfile={userProfile}>
        <RankInfo>
          <RanCntName>{contentTitle2}</RanCntName>
          <RankScore> {content2}</RankScore>
        </RankInfo>
        {userProfile ? 
          <ReuseProfile imgSrc={userProfile} content={username}/> : <></>
        }
      </RankCnt>
    </RankComp>
  )
}

export default ReuseRank;
const RankComp = styled.article`
  width: 260px;
  // width: 280px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`
const RankAvg = styled.div`
  flex-grow: 4;
  width: 100%;
  display: flex;
  justify-content: ${({userProfile}) => userProfile ? 'space-between':'center'};
  align-items: center;
  padding: 0px 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  &:hover{
    transition: all 0.4s ease-in-out;
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray});
  }
`
const RankCnt = styled.div`
  flex-grow: 2;
  width: 100%;
  display: flex;
  justify-content: ${({userProfile}) => userProfile ? 'space-between':'center'};
  align-items: center;
  padding: 0px 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  &:hover{
    flex-grow: 8;
    transition: all 0.4s ease-in-out;
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray});
  }
`
const RankSpace = styled.div`
  flex-grow: 1;
  display: flex;
  ${RankCnt}:hover &{
    flex-grow: 4;
  }
`
const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const RankAvgName = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_20};
  margin-bottom: 6px;
`
const RanCntName = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_20};
  margin-bottom: 6px;
`
const RankScore = styled.div`
  height: 30px;
  overflow-y: hidden;
  font-size: ${({theme}) => theme.fontSize.font_26};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
