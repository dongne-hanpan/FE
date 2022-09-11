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
    if(e.response){
      return e.response.data;
    } else if(e.request){
      return e.request;
    } else{
      console.error('Error', e.message);
    }
  }
}

export const getWithCookie = async(url,access) => {
  try{
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      }
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
  }catch(e){
    if(e.response){
      return e.response.data;
    } else if(e.request){
      return e.request;
    } else{
      console.error('Error', e.message);
    }
  }
};
export const postWithCookieFormData = async(url,payload,access) => {
  try{
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${access}`
      },
      data: payload
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
};
export const putWithCookie = async(url,payload,access) => {
  try{
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      },
      data: payload
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
};
export const deleteWithCookie = async(url,access) => {
  try{
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}${url}`,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`,
      },
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
};