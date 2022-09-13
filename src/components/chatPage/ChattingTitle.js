import styled from "styled-components";
import ReuseProfile from '../y_reusable/ReuseProfile';
import profile from '../../asset/profileMe.png';

const ChattingTitle = () => {
  return (
    <ChannelTitleWrapper>
        <MatchDate>2022.08.29</MatchDate>
        <MatchTime> 12:00~13:00</MatchTime>
        <UserProfiles>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
        </UserProfiles>
    </ChannelTitleWrapper>
  );
};



const ChannelTitleWrapper = styled.header`
  width: 790px;
  height: 110px;
  border-bottom: 0.1px solid grey;
  background-color: ${(props) => props.theme.palette.deep_blue};
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 20px;
`;

const LogoutButton = styled.button`
  width: 70px;
  height: 40px;
  background-color: inherit;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;


const MatchDate = styled.header`
    font-size: 24px;
    color: white;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 20px;
`;

const MatchTime = styled.header`
    font-size: 16px;
    color: skyblue;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;
const UserProfiles = styled.header`
    width: 50px;
    height: 50px;
    display: flex;
`;

export default ChattingTitle;
