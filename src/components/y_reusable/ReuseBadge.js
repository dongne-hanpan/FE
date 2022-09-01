import React from 'react';
import styled, { css } from 'styled-components';


const ReuseBadge = ({level}) => {
  return(
    <BadgeComp level={level}>
      <div>{level}</div>
    </BadgeComp>
  )
};

export default ReuseBadge;

const BadgeComp = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-12);
  font-weight: 500;
  border-radius: 1rem;
  ${({level}) => {
    if(level === '입문'){
      return css`
        background-color: var(--color-yellow);
      `
    } else if(level === '초급'){
      return css`
      background-color: var(--color-green);
    `
    } else if(level === '중급'){
      return css`
      color: var(--color-background);
      background-color: var(--color-red);
    `
    } else if(level === '상급'){
      return css`
      color: var(--color-background);
      background-color: var(--color-black);
    `

    }
  }}
`



