import React, { useState } from 'react';
import styled from 'styled-components';
import MatchCard from '../sportsPage/MatchCard';


const MyDoneList = ({doneList}) => {
  //완료된 매치 보기
  const [doneToggle, setDoneToggle] = useState(false);
  const showDoneToggle = () => {
    setDoneToggle(!doneToggle);
  }
  
  return(
    <>
      <ToggleBtn>
        <SmallBtn onClick={showDoneToggle}>{doneToggle ? '닫기' : '완료된 매치 보기'}</SmallBtn>
      </ToggleBtn>
      {doneToggle ? doneList.map((each) => 
        <MatchCard key={each.match_id} data={each} />)
        :<></>}
    </>
  )
};

export default React.memo(MyDoneList);


const ToggleBtn = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`
const SmallBtn = styled.span`
  padding: 10px 20px;
  color: ${({theme}) => theme.colors.gray};
  font-size: ${({theme}) => theme.fontSize.font_15};
  font-weight: ${({theme}) => theme.fontWeight.light};
  cursor: pointer;
`