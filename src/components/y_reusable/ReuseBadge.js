import React from 'react';
import styled, { css } from 'styled-components';


const ReuseBadge = ({direc, bdgType, content, clickEvent}) => {
  return(
    <BadgeComp direc={direc} bdgType={bdgType} content={content} onClick={clickEvent}>
      {content}
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
  margin: ${({direc}) => direc === 'verti' ? '4px 0px' : '0px 4px'};
  border-radius: 1rem;
  font-size: ${({theme}) => theme.fontSize.font_12};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  ${({bdgType, content, theme}) => {
    if(bdgType === 'rank'){
      if(content === '입문'){
        return css`
          background-color: ${theme.colors.yellow};
        `
      } else if(content === '초급'){
        return css`
        background-color: ${theme.colors.green};
      `
      } else if(content === '중급'){
        return css`
        color: ${theme.colors.background};
        background-color: ${theme.colors.red};
      `
      } else if(content === '상급'){
        return css`
        color: ${theme.colors.background};
        background-color: ${theme.colors.black};
      `
      }
    } else if (bdgType === 'sports'){
      if(content === '볼링'){
        return css`
        margin: 2px;
        background-color: ${theme.colors.yellow};
        `
      } else if(content === '테니스'){
        return css`
        margin: 2px;
        background-color: ${theme.colors.green};
        `
      } else if(content === '배드민턴'){
        return css`
        margin: 2px;
        color: ${theme.colors.background};
        background-color: ${theme.colors.red};
        `
      } else if(content === '달리기'){
        return css`
        margin: 2px;
        background-color: ${theme.colors.orange};
        `
      } else if(content === '라이딩'){
        return css`
        margin: 2px;
        background-color: ${theme.colors.gray};
        `
      } else if(content === '축구'){
        return css`
        margin: 2px;
        color: ${theme.colors.background};
        background-color: ${theme.colors.black};
        `  
      }
    } else if(bdgType === 'btn'){
      if(content === '프로필 편집' || content ==='로그 아웃'){
        return css`
        margin: 2px;
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.gray};
        cursor: pointer;
        `
      } else if(content === '과거 매치'){
        return css`
        margin: 2px;
        color: ${theme.colors.background};
        background-color: ${theme.colors.black};
        cursor: pointer;
        `  
      }
    }
  }}
`



