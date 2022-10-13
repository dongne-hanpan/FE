import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../shared/redux/modules/userSlice';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import { getCookie } from '../../shared/axios/cookie';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseVerticalBtns from '../reusable/ReuseVerticalBtns';
import ReuseRank from '../reusable/ReuseRank';


const MyPageHead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authError = useSelector((state) => state.user.error);
  const myPageData = useSelector((state) => state.match.elseData);
  const cookie = getCookie('mytoken');

  //프로필이미지 변경 에러 핸들링
  useEffect(() => {
    if(authError.errorType === 'updateProfileThunk'){
      if(authError.statusCode === 500){
        dispatch(setDialogue({dialType: 'denyFileUpload'}));
      }
    }
  },[authError])

  //유저정보 없으면 리다이렉트
  useEffect(() => {
    if(!cookie && !userData.username){
      navigate('/')
    }
  },[userData,authError,navigate])


  const showChageProfileModal = useCallback(() => {
    dispatch(setModal({modalType: 'changeProfile'}));
  },[]);
  const showMyComments = useCallback(() => {
      dispatch(setModal({modalType: 'commentWatch'}));
  },[]);
  const goChatPage = useCallback(() => {
    navigate('/chat');
  },[]);
  const doLogout = useCallback(() => {
    dispatch(logoutUserThunk());
  },[])

  const btnDataMaker = useMemo(() => {
    const btnsData = [
      {id: 0, type:'rank', content:myPageData.level},
      {id: 1, type:'btn', content:'프로필 편집', clickEvent: showChageProfileModal},
      {id: 3, type:'btn', content:'나의 후기', clickEvent: showMyComments},
      {id: 3, type:'btn', content:'채팅창 가기', clickEvent: goChatPage},
      {id: 4, type:'btn', content:'로그 아웃', clickEvent: doLogout},
    ];
    return btnsData;
  },[myPageData.level, showChageProfileModal, showMyComments, goChatPage, doLogout])
  
  return(
      <SportsAndRank>
        <ReuseProfile imgSrc={userData.profileImage} imgSize={'220'} />
        <ReuseVerticalBtns data={btnDataMaker} />
        <ReuseRank />
      </SportsAndRank>
  )
};

export default React.memo(MyPageHead);

const SportsAndRank = styled.section`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
`