import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAlermThunk, pushAlermData, replaceAlermData } from '../../shared/redux/modules/alermSlice';
import HeaderAlerm from './HeaderAlerm';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const Sse = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const alermData = useSelector((state) => state.alerm.alermData);

  let eventSource;
  const openCallback = () => {
    dispatch(getAlermThunk());
  }
  const errorCallback = (e) => {

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

  //SSE 연결
  useEffect(() => {
    if(userData.userId !== undefined){
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
        ): 
        <AlermComp>
          <AlermIcon className='fa-solid fa-bell' />
        </AlermComp>
      }
    </>
  )
};

export default React.memo(Sse);


const AlermComp = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
`
const AlermIcon = styled.i`
  margin-left: 20px;
  color: ${({theme}) => theme.colors.darkgray };
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`