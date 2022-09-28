import React, { useEffect, useState } from "react";
//kakaomap
import { Map, MapMarker } from 'react-kakao-maps-sdk';

//현재 상황
// 1. 크롬 시크릿모드에서 geocoder undefined =>
// 2. 크롬에서 뒤지게 개느림 defer 적용하면 safari 깨짐
// 3. 크롬에서 mapMarker 작동 안됨 - https로 바꿔보자
// 로컬에서 https 적용하기
// https로 변경하는 이유
// ref: https://apis.map.kakao.com/web/sample/geolocationMarker/
// ref: https://velog.io/@yaytomato/React-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-https%EB%A1%9C-%EB%A1%9C%EC%BB%AC-%ED%85%8C%EC%8A%A4%ED%8C%85%ED%95%98%EA%B8%B0#--%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-https%EB%A1%9C-%ED%85%8C%EC%8A%A4%ED%8C%85%ED%95%98%EA%B8%B0
// 내 ip? 172.30.1.60


const KaKaoMap = ({nowAddress}) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  const [state, setState] = useState({
    //현재 나의 위치 받아서 넣어주기
    center: { lat: 0, lng: 0 },
    isPanto: true,
  });

  const successCallback = (pos) => {
    const crd = pos.coords;
    setState({
      center: { lat: crd.latitude, lng: crd.longitude }
    })
  }
  const errorCallback = () => {
    console.log('fail get my Location data')
  }

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }
  
  useEffect(() => {
    if(nowAddress === null){
      getMyLocation()
    }else{
      SearchMap()
    }
  },[nowAddress]);


  const SearchMap = () => {
    const callback = function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result)
        console.log(nowAddress);
        const newSearch = result[0]
        console.log(newSearch);
        setState({
          center: { lat: newSearch.y, lng: newSearch.x }
        })
      }
    };
    geocoder.addressSearch(nowAddress, callback);
  }

  return (
    <Map 
      center={state.center}
      isPanto={state.isPanto}
      style={{width: "100%", height: "100%", zIndex: "0", borderRadius:"0.5rem", border:'1px solid #dfddd4'}}
      level={4}
      mapTypeId={window.kakao.maps.MapTypeId.ROADMAP}
      minLevel={2}
      maxLevel={5}
      draggable={false}
      >
        {/* 크롬에서는 https만 지원한데 */}
      <MapMarker position={state.center} />
    </Map>
  );
};

export default KaKaoMap;