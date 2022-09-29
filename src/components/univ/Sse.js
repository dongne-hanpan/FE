import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderAlerm from './HeaderAlerm';

const Sse = ({testAlerm, setTestAlerm}) => {
  console.log('refresh????', testAlerm)
  const userData = useSelector((state) => state.user.userData);

  //SSE
  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const BASE_URL = "http://3.34.142.119";
    const subscribeUrl = `${BASE_URL}/sub/${userData.userId}`;
    if(userData.username !== undefined){
      const eventSource = new EventSource(subscribeUrl, {
        withCredentials: true,
      });
      eventSource.onopen = function(e){
        console.log('SSE open success');
        console.log('status from open',eventSource.readyState)
      }
      // eventSource.onmessage = function(e) {
      //   console.log(e);
      //   console.log(JSON.parse(e.data));
      //   console.log('status from msg',eventSource.readyState)
      // }
      eventSource.onerror = function (e) {
        console.log(JSON.parse(e.data))
        console.log('status from error',eventSource.readyState)
        eventSource.close();
      }
      eventSource.addEventListener("connect", function (e) {
        const myAlerms = JSON.parse(e.data);
        console.log('connected, compare myAlerms and testAlerm', myAlerms,testAlerm)
        if(myAlerms !== testAlerm){
          setTestAlerm(myAlerms);
        }
      })
      eventSource.addEventListener("request", function (e) {
        const data = JSON.parse(e.data);
        console.log(data);
        let newMyAlerms = null;
        if(data.nickname !== undefined){
          newMyAlerms = {
            alermType: 'apply',
            ...data
          };
        }
        console.log('request', newMyAlerms)
        console.log('testAlerm',testAlerm);
        const neww = [...testAlerm, newMyAlerms];
        console.log('new',neww);
        setTestAlerm(neww);
      })
      eventSource.addEventListener("message", function (e) {
        const data = JSON.parse(e.data);
        let newMyAlerms = null;
        if(data.returnMessage === "신청이 수락되었습니다."){
          newMyAlerms = {
            alermType: 'permit',
            ...data
          };
        } else{
          newMyAlerms = {
            alermType: 'deny',
            ...data
          };
        }
        console.log('testAlerm',testAlerm);
        console.log('newMyAlerms',newMyAlerms);
        console.log('message, compare myAlerms and testAlerm', newMyAlerms,testAlerm)
        if([newMyAlerms] !== testAlerm){
          setTestAlerm([newMyAlerms]);
        }
      })
      return () => {
        eventSource.close();
      }
    }
  },[userData])

  useEffect(() => {
    console.log('init')
  },[]);
    
  useEffect(() => {
    console.log(testAlerm)
  },[testAlerm]);


  return(
    <>
      { testAlerm.length > 0 ? 
        testAlerm.map((each,params) => 
          <HeaderAlerm key={params} data={each} />
        ): <div>'로그인이 필요합니다'</div>
      }
    </>
  )
};

export default Sse;
