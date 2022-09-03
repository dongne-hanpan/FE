import React from 'react';
import styled, { css } from 'styled-components';


const ReuseBadge = ({direc, bdgType, content}) => {
  return(
    <BadgeComp direc={direc} bdgType={bdgType} content={content}>
      <div>{content}</div>
    </BadgeComp>
  )
};

export default ReuseBadge;

const BadgeComp = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  font-size: var(--font-12);
  font-weight: 500;
  border-radius: 1rem;
  ${({bdgType, content}) => {
    if(bdgType === 'rank'){
      if(content === '입문'){
        return css`
          background-color: var(--color-yellow);
        `
      } else if(content === '초급'){
        return css`
        background-color: var(--color-green);
      `
      } else if(content === '중급'){
        return css`
        color: var(--color-background);
        background-color: var(--color-red);
      `
      } else if(content === '상급'){
        return css`
        color: var(--color-background);
        background-color: var(--color-black);
      `
      }
    } else if (bdgType === 'sports'){
      if(content === '볼링'){
        return css`
        margin: 2px;
        background-color: var(--color-yellow);
        `
      } else if(content === '테니스'){
        return css`
        margin: 2px;
        background-color: var(--color-green);
        `
      } else if(content === '배드민턴'){
        return css`
        margin: 2px;
        color: var(--color-background);
        background-color: var(--color-red);
        `
      } else if(content === '달리기'){
        return css`
        margin: 2px;
        background-color: var(--color-orange);
        `
      } else if(content === '라이딩'){
        return css`
        margin: 2px;
        background-color: var(--color-gray);
        `
      } else if(content === '축구'){
        return css`
        margin: 2px;
        color: var(--color-background);
        background-color: var(--color-black);
        `  
      }
    } else if(bdgType === 'btn'){
      if(content === '프로필 편집'){
        return css`
        margin: 2px;
        background-color: var(--color-background);
        border: 1px solid var(--color-gray);
        `
      } else if(content === '과거 매치'){
        return css`
        margin: 2px;
        color: var(--color-background);
        background-color: var(--color-black);
        `  
      }
    }
  }}
  margin: ${({direc}) => direc === 'verti' ? '4px 0px' : '0px 4px'};
`



