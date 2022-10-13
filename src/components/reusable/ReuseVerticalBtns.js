import React from 'react';
import styled from 'styled-components';
import ReuseBadge from './ReuseBadge';


const ReuseVerticalBtns = ({data}) => {

  return(
    <VerticalBtnsComp>
      {data.map((each) => 
          <ReuseBadge key={each.id} direc={'verti'} bdgType={'btn'} content={each.content} clickEvent={each.clickEvent} />
      )}
    </VerticalBtnsComp>
  )
};

export default React.memo(ReuseVerticalBtns);

const VerticalBtnsComp = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`