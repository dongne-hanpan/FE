import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { getLocal } from './axios/local';



const MapNaver = ({injAddress}) => {
  const mapElement = useRef(null);
  const {naver} = window;
  const myLatLng = getLocal('myLatLng');

  const [nowLatLng, setNowLatLng] = useState(new naver.maps.LatLng(myLatLng ? myLatLng.lat:37.5656, myLatLng ? myLatLng.lng :126.978));
  let map;

  const mapOptions = {
    mapTypeId: naver.maps.MapTypeId.NORMAL,
    center: nowLatLng,
    zoom: 16,
    disableKineticPan: false,
    zoomControl: false,
  }

  useEffect(() => {
    if(!mapElement.current || !naver){
      return
    }
    map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: nowLatLng,
      map,
    });
  },[nowLatLng]);

  useEffect(() => {
    if(map !== null && injAddress !== null){
      naver.maps.Service.geocode({ address: injAddress }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something wrong!');
        }
        // 성공 시의 response 처리
        const latlng = response.result.items[0].point;
        const newNowLatLng = [latlng.x, latlng.y];
        setNowLatLng(newNowLatLng);
      });
    }
  },[injAddress])



  return (
    <MapComp ref={mapElement}></MapComp>
  );
};

export default MapNaver;

const MapComp = styled.div`
  width:100%;
  height:100%;
  // border:1px solid #c4c2b9;
  border:1px solid #d3d1c6;
  border-radius: 0.5rem; 
`
// 코드 참고 블로그
// ref: https://blog.naver.com/PostView.naver?blogId=lsw3210&logNo=221996143141&categoryNo=26&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=search
// docs
// https://navermaps.github.io/maps.js/docs/index.html
// 사용법:
//   모르는 것 있을 때 검색창에 class.이라고 치면 관련 api 목록 조회 가능