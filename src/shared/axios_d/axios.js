import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getwithoutCookie = async(url) => {
  try{
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}${url}`
    })
    if(res.status === 200){
      return res.data;
    }
    throw new Error('bad status')
  }catch(e){
    throw new Error('failed in axios')
  }
}

export const postWithoutCookie = async(url,payload) => {
  try{
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}${url}`,
      data: payload
    })
    if(res.status === 200 || res.status === 201){
      return res.data;
    }
  }catch(e){
    if(e.response.status === 400 || e.response.status === 404 || e.response.status === 401){
      return e.response.data;
    }
  }
}

export const getWithCookie = async(url,access,refresh) => {
  try{
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`,
        "Refresh-Token": refresh
      }
    })
    if(res.status === 200){
      return res.data;
    }
    throw new Error('bad status')
  }catch(e){
    throw new Error('failed in axios')
  }
};
export const postWithCookie = async(url,payload,access) => {
  try{
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`,
      },
      data: payload
    })
    if(res.status === 200){
      return res.data;
    }
    throw new Error('bad status')
  }catch(e){
    throw new Error('failed in axios')
  }
};
export const postWithCookieFormData = async(url,payload,access,refresh) => {
  try{
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${access}`,
        "Refresh-Token": refresh
      },
      data: payload
    })
    if(res.status === 200){
      return res.data;
    }
    throw new Error('bad status')
  }catch(e){
    throw new Error('failed in axios')
  }
};
export const putWithCookie = async(url,payload,access,refresh) => {
  try{
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`,
        "Refresh-Token": refresh
      },
      data: payload
    })
    if(res.status === 200){
      return res.data;
    }
    console.log(res)
    throw new Error('dd')
  }catch(e){
    throw new Error('failed in axios',e)
  }
};
export const deleteWithCookie = async(url,access,refresh) => {
  try{
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`,
        "Refresh-Token": refresh
      },
    })
    if(res.status === 200){
      return res.data;
    }else{
      console.log(res)
      return res
    }
  }catch(e){
    throw new Error('failed in axios',e)
  }
};