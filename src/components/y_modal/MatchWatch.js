import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseProfile from '../y_reusable/ReuseProfile';
import ReuseTemperature from '../y_reusable/ReuseTemperature';

import you from '../../asset/profileYou.png'
import ReuseBadge from '../y_reusable/ReuseBadge';

const MatchWatch = () => {

  return(
    <ModalWatchComp>
      <MatchInfo>
        <div>
          <div className="matchDate">2022.08.27</div>
          <div className="matchTime">11:00 (토)</div>
          <div className="matchPlace">
            <div className="place">한숲볼링센터<span className="placeIcon">i</span></div>
            <div className='placeDetail'>서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호 <span>복사하기</span></div>
          </div>
        </div>
        <div className="matchHost">
            <ReuseProfile imgSrc={you} content={'영 준'} imgSize={80} contentSize={'var(--font-16)'}/>
            <ReuseBadge level={'초급'} />
          </div>
      </MatchInfo>
      <hr />
      <Matchadditional>
        <div className="matchDesc">

          <p>주말에 함께 볼링 치실 분들 찾습니다. 남녀 무관합니다.</p>
        </div>
        <ReuseTemperature tempType={'personal'} temp={69} />
      </Matchadditional>

      <MatchContact>
        <div className='matchIntake'>모집 인원: <span>3</span>/4 명</div>
        <ReuseBtn styleType={'stretch'} content={'연락하기'} />
      </MatchContact>
    </ModalWatchComp>
  )
};

export default MatchWatch;

const ModalWatchComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  & hr{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`

const MatchInfo = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  .matchDate{
    width: 100%;
    margin-bottom: 10px;
    font-size: var(--font-40);
  }
  .matchTime{
    width: 100%;
    margin-bottom: 10px;
    font-size: var(--font-26);
  }
  .matchPlace{
    width: 100%;
    display: flex;
    font-size: var(--font-32);
    .placeIcon{
      margin-left: 14px;
      font-size: var(--font-12);
      cursor: pointer;
    }
    .placeDetail{
      display: none;
    }
    .placeIcon:hover .placeDetail{
      display: flex;
      font-size: var(--font-14);
    }
  }
  .matchHost{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`
const Matchadditional = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  .matchDesc{
    width: 240px;
    padding: 10px 0px;
    background-color: var(--color-background-light);
    border-radius: 1rem;
  }
  & p{
    font-size: var(--font-14);
    padding: 0px 20px;
    line-height: 20px;
  }
`
const MatchContact = styled.div`
  width: 100%;
  display: flex;
  .matchIntake{
    width: 400px;
    display: flex;
    align-items: center;
    font-size: var(--font-18);
    font-weight: 700;
    & span{
      margin-left: 10px;
      color: var(--color-gray);
    }
  }

`