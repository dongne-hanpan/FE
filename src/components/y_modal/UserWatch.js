import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../y_reusable/ReuseProfile';
import ReuseBadge from '../y_reusable/ReuseBadge';
import ReuseRank from '../y_reusable/ReuseRank';
import ReuseTemperature from '../y_reusable/ReuseTemperature';
import ReuseBtn from '../y_reusable/ReuseBtn';

//tmp
import you from '../../asset/profileYou.png';
import me from '../../asset/profileMe.png';


const UserWatch = () => {
  return(
    <UserWatchComp>
      <UserInfo>
        <ReuseProfile imgSrc={you} imgSize={120}/>
        <UserInfoDetail>
          <NameAndBadge>
            <Name>영동</Name>
            <ReuseBadge bdgType={'rank'} content={'상급'}/>
          </NameAndBadge>
          <SportsBadges>
            <ReuseBadge bdgType={'sports'} content={'테니스'} />
            <ReuseBadge bdgType={'sports'} content={'볼링'} />
            <ReuseBadge bdgType={'sports'} content={'배드민턴'} />
            <ReuseBadge bdgType={'sports'} content={'달리기'} />
            <ReuseBadge bdgType={'sports'} content={'축구'} />
            <ReuseBadge bdgType={'sports'} content={'라이딩'} />
          </SportsBadges>
        </UserInfoDetail>
      </UserInfo>
      <UserFriends>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'동윤'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'대우'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'성원'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'영준'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'상우'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'동욱'}/>
        <ReuseProfile direc={'horiz'} imgSrc={me} content={'영훈'}/>
      </UserFriends>
      <UserRank>
        <ReuseTemperature tempType={'personal'} temp={69}/>
        <RankVertical>
          <ReuseRank type={'avg'} contentTitle={'평균 점수'} content={'85 점'} />
          <ReuseRank type={'cnt'} contentTitle={'총 매치 수'} content={'69 회'} />
        </RankVertical>
      </UserRank>
      <ReuseBtn styleType={'stretch'} content={'친구하기'} />
    </UserWatchComp>
  )
};

export default UserWatch;

const UserWatchComp = styled.section`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const UserInfo = styled.article`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`
const UserInfoDetail = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`
const NameAndBadge = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
`
const Name = styled.div`
  margin-right: 10px;
  font-size: ${({theme}) => theme.fontSize.font_40};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const SportsBadges = styled.div`
  display: flex;
  // align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const UserFriends = styled.article`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`
const UserRank = styled.article`
  width: 100%;
  height: 240px;
  display: flex;
`
const RankVertical = styled.div`
  flex-grow:1;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`