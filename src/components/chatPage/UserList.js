import { useEffect, useState } from "react";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";

import Modal from "../../components/chatPage/elements/Modal";
import UserCreator from "./UserCreator";
import { ChatAPI } from "../../shared/api";
import styled from "styled-components";


const UserList = () => {
  const [modalToggel, setModlaToggle] = useState(false);
  const params = useParams().channel_id;
  const navigate = useNavigate();
  const closeModal = () => {
    setModlaToggle(false);
  };
  const [userData, setUserData] = useState([]);

  // 채널나가기
  const exitChannel = () => {
    ChatAPI.exitChatRoom(params)
      .then((res) => {
        navigate("/channel");
        window.location.reload();
      })
      .catch((error) => {
        console.log("채널 나가기 실패", error);
      });
  };

  // [GET] /api/users/{channel_id}
  useEffect(() => {
    // params 있을때만 유저데이터 가져오기
    if (params) {
      ChatAPI.getUserList(params)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.log("유저리스트 조회 실패", error);
        });
    }
  }, [params]);

  return (
    <UserListWrapper>
      <ChannelInfo>
        유저 목록
        <FiLogOut onClick={exitChannel} />
      </ChannelInfo>
      {userData.map((user) => (
        <UserContainer key={user.username}>
          <UserProfileImageBox>
            <UserProfileImage
              src={`${process.env.PUBLIC_URL}/images/profile.png`}
            />
          </UserProfileImageBox>
          {user.username}
        </UserContainer>
      ))}
      <UserContainer>
        <PlusIconBox
          onClick={() => {
            setModlaToggle(true);
          }}
        >
          <FiPlus />
        </PlusIconBox>
        인원 추가
      </UserContainer>
      <Modal visible={modalToggel} closeModal={closeModal}>
        <UserCreator
          visible={modalToggel}
          closeModal={closeModal}
          userData={userData}
          setUserData={setUserData}
        ></UserCreator>
      </Modal>
    </UserListWrapper>
  );
};


const UserListWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ChannelInfo = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 0.1px solid grey;
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
const UserContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  font-size: 18px;
  color: white;
`;

const UserProfileImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  margin-right: 20px;
  background-color: white;
  cursor: pointer;
`;
const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
const PlusIconBox = styled(UserProfileImageBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.3);
`;
const PlusIcon = styled.div`
  font-size: 32px;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
`;


export default UserList;
