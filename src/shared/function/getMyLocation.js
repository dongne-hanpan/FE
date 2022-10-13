import { setLocal } from '../axios/local';

  // 나의 위치 값 받아오기
const successCallback = (pos) => {
  const crd = pos.coords;
  const myLatLng = {
    lat: crd.latitude,
    lng: crd.longitude
  }
  setLocal('myLatLng', myLatLng)
}
const errorCallback = (e) => {
  console.error(e);
}
export const getMyLocation = () => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}