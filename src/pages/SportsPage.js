import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../components/y_reusable/ReuseProfile';
import MatchCard from '../components/sportsPage/MatchCard';

// tmp
import sun from '../asset/sun.png';
import you from '../asset/profileYou.png';
import ReuseRank from '../components/y_reusable/ReuseRank';
import ReuseTemperature from '../components/y_reusable/ReuseTemperature';

const SportsPage = () => {
  return(
    <MainPage>
      <SportsAndRank>
        <ReuseProfile imgSrc={sun} imgSize={'220'} />
        <RankArticle>
          <ReuseTemperature tempType={'rank'} userProfile={you} username={'성 원'} temp={69}/>
          <RankVertical>
            <ReuseRank contentTitle={'우리 동네 점수 왕'} content={'85 점'} userProfile={you} username={'성 원'}/>
            <ReuseRank contentTitle={'우리 동네 매치 왕'} content={'69 회'} userProfile={you} username={'성 원'}/>
          </RankVertical>
        </RankArticle>
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <MatchContainerHeaderTitle>동네 한 판?</MatchContainerHeaderTitle>
          <MatchContainerHeaderUsers>profile 컨테이너</MatchContainerHeaderUsers>
        </MatchContainerHeader>
        <CircleBtns>
          <CircleBtn>
            <CircleBtnContent>필</CircleBtnContent>
          </CircleBtn>
          <CircleBtn>
            <CircleBtnContent>+</CircleBtnContent>
          </CircleBtn>
        </CircleBtns>
        <MatchContainerBody>
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
        </MatchContainerBody>
      </MatchContainer>
    </MainPage>
  )
};

export default SportsPage;

const MainPage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const SportsAndRank = styled.section`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
`
const RankArticle = styled.article`
  display: flex;
`
const RankVertical = styled.div`
  width: 280px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`
const MatchContainer = styled.section`
  width: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
`
const MatchContainerHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MatchContainerHeaderTitle = styled.h2`
  font-size: ${({theme}) => theme.fontSize.font_32};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchContainerHeaderUsers = styled.div`
  display: flex;
`
const MatchContainerBody = styled.ul`
  padding: 0px;
`
const CircleBtns = styled.div`
  position: absolute;
  right: -60px;
  top: 70px;
`
const CircleBtn = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 2rem;
  background-color: ${({theme}) => theme.colors.skyblue};
`
const CircleBtnContent = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
