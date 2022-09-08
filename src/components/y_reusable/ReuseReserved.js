import React from 'react';
import styled from 'styled-components';


const ReuseReserved = ({matches, marginPx}) => {
  return(
    <ReserveComp>
      <div className="reserveCnt">
        <div>
          {matches}회
        </div>
      </div>
      <div>
        예약 된 <br />
        매치
      </div>
    </ReserveComp>
  )
};

export default ReuseReserved;


const ReserveComp = styled.div`
  margin: 0px 15px;
  color: ${({theme}) => theme.colors.background};
  font-weight: ${({theme}) => theme.fontWeight.light};
  text-align: center;
  .reserveCnt{
    height: 50px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({theme}) => theme.fontSize.font_32};
    font-weight: ${({theme}) => theme.fontWeight.medium};
  }
`


