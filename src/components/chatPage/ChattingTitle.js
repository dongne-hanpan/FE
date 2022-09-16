import React from "react";
import styled from "styled-components";
import ReuseProfile from '../y_reusable/ReuseProfile';
import profile from '../../asset/profileMe.png';


const ChattingTitle = () => {
  return (
    <ChannelTitleWrapper>
        <UserProfiles>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
        </UserProfiles>
    </ChannelTitleWrapper>
  );
};

const ChannelTitleWrapper = styled.div`
  width: 830px;
  height: 110px;
  border-bottom: 0.1px solid grey;
  background-color: #8ACCE4;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 20px;
`;
const UserProfiles = styled.header`
    width: 50px;
    height: 50px;
    display: flex;
`;
export default ChattingTitle;
