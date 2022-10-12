import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../asset/logo.png';


const HeaderLogo = () => {
  const navigate = useNavigate();

  // 네비게이터 함수 모음
  const goIndexPage = () => {
    navigate('/');
  }

  return(
      <HeaderLogoSection>
        <Logo src={logo} alt="dongne_logo" onClick={goIndexPage} />
      </HeaderLogoSection>
  )
};

export default React.memo(HeaderLogo);


const HeaderLogoSection = styled.article`
  flex-grow: 4;
  min-width: 150px;
  `
  const Logo = styled.img`
  height: 40px;
  margin: 0px 10px;
  cursor: pointer;
`