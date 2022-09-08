import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../components/y_reusable/ReuseProfile';
import ReuseRank from '../components/y_reusable/ReuseRank';
import ReuseTemperature from '../components/y_reusable/ReuseTemperature';
import ReuseBadge from '../components/y_reusable/ReuseBadge';
import MatchCard from '../components/sportsPage/MatchCard';

// tmp
import sun from '../asset/sun.png';
import you from '../asset/profileYou.png';

const MyPage = () => {
  return(
    <MainPage>
      <SportsAndRank>
        <ReuseProfile imgSrc={sun} imgSize={'220'} />
        <article className="userBtns">
          <ReuseBadge direc={'verti'} bdgType={'rank'} content={'중급'}/>
          <ReuseBadge direc={'verti'} bdgType={'btn'} content={'프로필 편집'}/>
        </article>
        <article className="userRank">
          <ReuseTemperature tempType={'rank'} userProfile={you} username={'성 원'} temp={69}/>
          <div className="rankSection">
            <ReuseRank contentTitle={'우리 동네 점수 왕'} content={'85 점'} userProfile={you} username={'성 원'}/>
            <ReuseRank contentTitle={'우리 동네 매치 왕'} content={'69 회'} userProfile={you} username={'성 원'}/>
          </div>
        </article>
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <span>나의 매치</span>
          <div>profile 컨테이너</div>
        </MatchContainerHeader>
        <ul>
          <MatchCard matchState={'reserved'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'recruit'} />
          <MatchCard matchState={'done'} />
          <MatchCard matchState={'done'} />
          <MatchCard matchState={'done'} />
          <MatchCard matchState={'done'} />
        </ul>
      </MatchContainer>
    </MainPage>
  )
};

export default MyPage;

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
  & ul{
    padding: 0px;
  }
`
const SportsAndRank = styled.section`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
  .userBtns{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .userRank{
    display: flex;
    .rankSection{
      width: 280px;
      height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
    }
  }
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
  & span{
    font-size: ${({theme}) => theme.fontSize.font_32};
    font-weight: ${({theme}) => theme.fontWeight.bold};
  }
  & div{
    display: flex;
  }
`
