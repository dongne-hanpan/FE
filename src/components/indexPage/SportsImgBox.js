import React from 'react';
import styled from 'styled-components';


const SportsImgBox = ({clickedSports, data, selectSports, showSportsName}) => {

  return (
    <SportsImgBoxComp key={data.sportsId} aria-label={data.sports} onClick={selectSports} onMouseEnter={showSportsName}>
      <SportsImg src={data.sportsImage} alt={data.sports} sports={clickedSports} />
    </SportsImgBoxComp>
  )
}

export default React.memo(SportsImgBox);

const SportsImgBoxComp = styled.button`
  width: 200px;
  margin: 0px 10px;
  margin-bottom: 20px;
  border-radius: 2rem 1rem 1rem 0rem;
`
const SportsImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 2rem 1rem 1rem 0rem;
  border: 3px solid ${({alt, sports, theme}) => alt === sports ?  theme.colors.skyblue: theme.colors.background};
  &:hover{
    border: 3px solid ${({theme}) => theme.colors.skyblue};
  }
`