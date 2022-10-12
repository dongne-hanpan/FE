import React from 'react';
import styled, { css } from 'styled-components';


const ReuseTitle = ({injContent,injErrRef,injErrStatus}) => {
  return(
    <InputTitle>
      {injContent}
      <ErrMessage ref={injErrRef} status={injErrStatus}></ErrMessage>
    </InputTitle>
  )
};

export default React.memo(ReuseTitle);



const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ErrMessage = styled.span`
  margin-left: 10px;
  font-size: ${({theme}) => theme.fontSize.font_12};
  ${({status, theme}) => {
    if(status === 'success'){
      return css`
      display: inline;
      color: ${theme.colors.green};
      `
    } else if(status === 'danger'){
      return css`
      display: inline;
      color: ${theme.colors.red_light};
      `
    } else if(status === 'none'){
      return css`
      display: none;
      `
    }
  }}
`
