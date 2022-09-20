import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseBadge from '../reusable/ReuseBadge';
import ReuseTemperature from '../reusable/ReuseTemperature';
import ReuseBtn from '../reusable/ReuseBtn';


const UserWatch = () => {
  const modalData = useSelector((state) => state.modal.modalData);
  const userDetailData = modalData.userData;
  return(
    <UserWatchComp>
      <UserInfo>
        <ReuseProfile imgSrc={userDetailData.profileImage} imgSize={120}/>
        <UserInfoDetail>
          <NameAndBadge>
            <Name>{userDetailData.nickname}</Name>
            <ReuseBadge bdgType={'rank'} content={userDetailData.userLevel}/>
          </NameAndBadge>
          <SportsBadges>
            {userDetailData.sports !== undefined ?
              userDetailData.sports.map((each) => 
                <ReuseBadge key={each} bdgType={'sports'} content={each} />
              ):<></>
            }
          </SportsBadges>
        </UserInfoDetail>
      </UserInfo>
      <UserFriends>
        {userDetailData.friends !== undefined ?
          userDetailData.friends.map((each) => 
            <ReuseProfile key={each.nickname} direc={'horiz'} imgSrc={each.profileImage} content={each.nickname}/>
          ):<></>
        }
      </UserFriends>
      <UserRank>
        <ReuseTemperature type={'personal'} type2={'score'} data={userDetailData.averageScore} />
        <ReuseTemperature type={'personal'} type2={'count'} data={userDetailData.matchCount} />
        <ReuseTemperature type={'personal'} type2={'temper'} data={userDetailData.mannerPoint} />
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
  font-size: ${({theme}) => theme.fontSize.font_32};
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