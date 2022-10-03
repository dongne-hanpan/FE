import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWithCookie } from '../../shared/axios/axios';
import { getCookie } from '../../shared/axios/cookie';


const MyReservedCnt = ({clickEvent}) => {
  const cookie = getCookie('mytoken')
  const [reservedCnt,setReservedCnt] = useState(0);
  const getMyReservedCnt = async() => {
    const res = await getWithCookie('/api/match/reserved-match',cookie);
    if(res.statusCode !== undefined){
      return
    }
    setReservedCnt(res.length);
  }
  useEffect(() => {
    if(cookie !== null){
      getMyReservedCnt();
    }
  },[])
  return(
    <ReserveComp onClick={clickEvent}>
      <ReserveCnt>
        {reservedCnt}회
      </ReserveCnt>
        예약 된 <br /> 매치
    </ReserveComp>
  )
};

export default MyReservedCnt;



const ReserveComp = styled.div`
  margin: 0px 15px;
  color: ${({theme}) => theme.colors.background};
  font-weight: ${({theme}) => theme.fontWeight.light};
  text-align: center;
  cursor: pointer;
`
const ReserveCnt = styled.div`
  height: 50px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({theme}) => theme.fontSize.font_32};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`


