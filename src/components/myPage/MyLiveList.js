import React from 'react';
import MatchCard from '../sportsPage/MatchCard';


const MyLiveList = ({reservedList, recruitList}) => {
  
  return(
    <>
      {reservedList ? reservedList.map((each) => 
        <MatchCard key={each.match_id} data={each} />
        ):<></>}
      {recruitList ? recruitList.map((each) => 
        <MatchCard key={each.match_id} data={each} />
        ):<></>}
    </>
  )
};

export default React.memo(MyLiveList);