import React from 'react';
import styled, { keyframes } from 'styled-components';


const Loading = ({size}) => {
  return (
      <LoadingComp size={size} />
  )
}
export default Loading;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingComp = styled.div`
  border: ${({theme,size}) => size ? `${size/60*8}px solid ${theme.colors.background_light}`: `${size/60*8} solid ${theme.colors.background_light}` };
  border-top: ${({theme,size}) => size ? `${size/60*8}px solid ${theme.colors.core}`: `${size/60*8} solid ${theme.colors.core}` };
  border-radius: 50%;
  width: ${({size}) => size ? size + 'px' : '60px'};
  height: ${({size}) => size ? size + 'px' : '60px'};
  animation: ${spin} 1.2s ease-in-out infinite;
`
