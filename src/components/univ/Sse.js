import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlermThunk, pushAlermData, replaceAlermData } from '../../shared/redux/modules/alermSlice';
import HeaderAlerm from './HeaderAlerm';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Sse = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const alermData = useSelector((state) => state.alerm.alermData);

  let eventSource;
  const openCallback = () => {
    console.log('SSE open');
    dispatch(getAlermThunk());
  }
  const errorCallback = (e) => {
    console.log(JSON.parse(e.data))
    eventSource.close();
  }
  const connectCallback = (e) => {
    const data = JSON.parse(e.data);
    if(data.length !== undefined){
      dispatch(replaceAlermData(data))
    }else{
      dispatch(pushAlermData(data));
    }
  };

  //SSE
  useEffect(() => {
    //로그인 되어 있다면
    if(userData.userId !== undefined){
      // SSE 선언, 연결, 이벤트 리스너 등록
      const subscribeUrl = `${BASE_URL}/sub/${userData.userId}`;
      eventSource = new EventSource(subscribeUrl, { withCredentials: true });
      eventSource.onopen = openCallback
      eventSource.onerror = errorCallback
      eventSource.addEventListener("connect", connectCallback)
      return () => {
        eventSource.removeEventListener('connect', connectCallback);
        eventSource.close();
        console.log('SSE close');
      }
    }
  },[userData.userId])


  return(
    <>
      { alermData.length > 0 ? 
        alermData.map((each,idx) => 
          <HeaderAlerm key={idx} data={each} />
        ): <div>'로그인이 필요합니다'</div>
      }
    </>
  )
};

export default Sse;
