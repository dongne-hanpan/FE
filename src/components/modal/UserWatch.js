import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { postWithoutCookie } from '../../shared/axios/axios';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseBadge from '../reusable/ReuseBadge';
import ReuseTemperature from '../reusable/ReuseTemperature';
import Comment from '../univ/Comment';


const UserWatch = () => {
  const userDetailData = useSelector((state) => state.modal.modalData.userData);
  const [commentList, setCommentList] = useState([]);
  const getComments = async() => {
    const nicknameData = {nickname: userDetailData.nickname}
    const res = await postWithoutCookie('/api/user/show-comment',nicknameData);
    setCommentList(res);
  }
  useEffect(() => {
    getComments();
  },[])
  const sportsList = ['볼링', '달리기', '테니스'];

  return(
    <UserWatchComp>
      <UserInfo>
        <ReuseProfile imgSrc={userDetailData.profileImage} imgSize={70}/>
        <UserInfoDetail>
          <NameAndBadge>
            <Name>{userDetailData.nickname}</Name>
            <ReuseBadge bdgType={'rank'} content={userDetailData.userLevel}/>
          </NameAndBadge>
          <SportsBadges>
            {sportsList !== undefined ?
              sportsList.map((each) => 
                <ReuseBadge key={each} bdgType={'sports'} content={each} />
              ):<></>
            }
            {/* {userDetailData.sports !== undefined ?
              userDetailData.sports.map((each) => 
                <ReuseBadge key={each} bdgType={'sports'} content={each} />
              ):<></>
            } */}
          </SportsBadges>
        </UserInfoDetail>
      </UserInfo>
      <UserRank>
        <ReuseTemperature type={'personal'} type2={'score'} data={userDetailData.averageScore} />
        <ReuseTemperature type={'personal'} type2={'count'} data={userDetailData.matchCount} />
        <ReuseTemperature type={'personal'} type2={'temper'} data={userDetailData.mannerPoint} />
      </UserRank>
      <UserComments>
        {commentList.length > 0 ?
          commentList.map((each,idx) => 
            <Comment key={idx} bdgType={'sports'} content={each} />
          ):<div>후기가 없습니다.</div>
        }
      </UserComments>
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
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`
const UserInfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`
const NameAndBadge = styled.div`
  display: flex;
  align-items: center;
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
const UserRank = styled.article`
  width: 100%;
  height: 220px;;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`
const UserComments = styled.article`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background_light};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
}
`