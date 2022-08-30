import { useEffect, useState } from "react";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";

import Modal from "../../../components/chatPage/elements/modal";
import UserCreator from "../userCreator";
import { ChatAPI } from "../../../shared/redux_j/api";
import {
  ChannelInfo,
  PlusIconBox,
  UserContainer,
  UserListWrapper,
  UserProfileImage,
  UserProfileImageBox,
} from "./style";

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

export default UserList;
