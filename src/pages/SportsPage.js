import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../components/y_reusable/ReuseProfile';
import MatchCard from '../components/sportsPage/MatchCard';

// tmp
import sun from '../asset/sun.png';
import you from '../asset/profileYou.png';
import ReuseRank from '../components/y_reusable/ReuseRank';
import ReuseRankVertical from '../components/y_reusable/ReuseRankVertical';

const SportsPage = () => {
  return(
    <MainPage>
      <SportsAndRank>
        <ReuseProfile imgSrc={sun} imgSize={'220'} />
        <article>
          <ReuseRankVertical userProfile={you} username={'성 원'} temperture={69}/>
          <div className="rankSection">
            <ReuseRank type={'avg'} content={'85'} userProfile={you} username={'성 원'}/>
            <ReuseRank type={'cnt'} content={'69'} userProfile={you} username={'성 원'}/>
          </div>
        </article>
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <span>동네 한 판?</span>
          <div>profile 컨테이너</div>
        </MatchContainerHeader>
        <CircleBtns>
          <button><div>필</div></button>
          <button><div>+</div></button>
        </CircleBtns>
        <ul>
          <MatchCard />
          <MatchCard />
        </ul>
      </MatchContainer>
    </MainPage>
  )
};

export default SportsPage;

const MainPage = styled.main`
  // width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  & ul{
    padding: 0px;
  }
`
const SportsAndRank = styled.section`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
  & article{
    display: flex;
  }
  .rankSection{
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
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
    font-size: var(--font-32);
    font-weight: 700;
  }
  & div{
    display: flex;
  }
`

const CircleBtns = styled.div`
  position: absolute;
  right: -60px;
  top: 70px;
  & button{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 2rem;
    background-color: var(--color-skyblue);
    & div{
      font-size: var(--font-20);
      font-weight: 700;
    }
  }
`


