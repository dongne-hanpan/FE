import React from 'react';
import styled from 'styled-components';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseBadge from '../reusable/ReuseBadge';
import ReuseTemperature from '../reusable/ReuseTemperature';
import ReuseBtn from '../reusable/ReuseBtn';

// tmp
import dummyUserDetail from '../../dummyData/dummyUserDetail';
import defaultProfile from '../../asset/defaultprofile.jpg';

const UserWatch = () => {
  return(
    <UserWatchComp>
      <UserInfo>
        <ReuseProfile imgSrc={dummyUserDetail.profileImage ? dummyUserDetail.profileImage :defaultProfile} imgSize={120}/>
        <UserInfoDetail>
          <NameAndBadge>
            <Name>{dummyUserDetail.nickname}</Name>
            <ReuseBadge bdgType={'rank'} content={'상급'}/>
          </NameAndBadge>
          <SportsBadges>
            {dummyUserDetail.sports.length !== 0 ?
              dummyUserDetail.sports.map((each) => 
                <ReuseBadge key={each} bdgType={'sports'} content={each} />
              ):<></>
            }
          </SportsBadges>
        </UserInfoDetail>
      </UserInfo>
      <UserFriends>
        {dummyUserDetail.friends.length !== 0 ?
          dummyUserDetail.friends.map((each) => 
            <ReuseProfile key={each.nickname} direc={'horiz'} imgSrc={each.profileImage ? each.profileImage:defaultProfile} content={each.nickname}/>
          ):<></>
        }
      </UserFriends>
      <UserRank>
        <ReuseTemperature type={'personal'} type2={'score'} data={dummyUserDetail.rank.average} />
        <ReuseTemperature type={'personal'} type2={'count'} data={dummyUserDetail.rank.matchcount} />
        <ReuseTemperature type={'personal'} type2={'temper'} data={dummyUserDetail.rank.temperature} />
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
  justify-content: center;
`