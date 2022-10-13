import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReuseTemperature from './ReuseTemperature';


const ReuseRank = () => {
  const myPageData = useSelector((state) => state.match.elseData);

  return(
    <RankArticle>
      <ReuseTemperature type={'personal'} type2={'score'} data={myPageData.score} />
      <ReuseTemperature type={'personal'} type2={'count'} data={myPageData.matchCount} />
      <ReuseTemperature type={'personal'} type2={'temper'} data={myPageData.mannerPoint} />
    </RankArticle>
  )
};

export default React.memo(ReuseRank);


const RankArticle = styled.article`
  display: flex;
`