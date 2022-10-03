import axios from 'axios';

export const getWeather = async() => {
  const latitude = process.env.REACT_APP_LATITUDE;
  const longitude = process.env.REACT_APP_LONGITUDE;
  const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI}&units=metric`;
  try{
    const res = await axios({
      method: 'GET',
      url: url
    })
    if(res.status === 200){
      return res.data;
    }
  }catch(e){
    if(e.response){
      return e.response.data;
    } else if(e.request){
      return e.request;
    } else{
      console.error('Error', e.message);
    }
  }
}