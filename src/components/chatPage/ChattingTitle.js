import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiPlus, FiLogOut } from "react-icons/fi";
import ReuseProfile from '../y_reusable/ReuseProfile';
import profile from '../../asset/profileMe.png';
import Modal from "../../components/chatPage/elements/Modal";
import UserCreator from "./UserCreator";


const ChattingTitle = () => {
  const [modalToggel, setModlaToggle] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setModlaToggle(false);
  };
  const [userData, setUserData] = useState([]);
  return (
    <ChannelTitleWrapper>
        <MatchDate>2022.08.29</MatchDate>
        <MatchTime> 12:00~13:00</MatchTime>
        <UserProfiles>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <ReuseProfile imgSrc={profile}></ReuseProfile> <p>영동</p>
          <UserContainer>
            <PlusIconBox
              onClick={() => {
                setModlaToggle(true);
              }}
            >
              <FiPlus />
            </PlusIconBox>
          <p>추가</p>
          </UserContainer>
          <Modal visible={modalToggel} closeModal={closeModal}>
            <UserCreator
              visible={modalToggel}
              closeModal={closeModal}
              userData={userData}
              setUserData={setUserData}
            ></UserCreator>
          </Modal>
        </UserProfiles>
    </ChannelTitleWrapper>
  );
};



const ChannelTitleWrapper = styled.header`
  width: 830px;
  height: 110px;
  border-bottom: 0.1px solid grey;
  background-color: #8ACCE4;
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
const UserContainer = styled.div`
  width: 300px;
  height: 50px;
  padding: 10px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  font-size: 18px;
  color: white;
  background-color: #8ACCE4;
`;
const PlusIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.3);
`;
export default ChattingTitle;
