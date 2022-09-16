import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { ChatAPI } from "../../shared/api";


const UserList = () => {
  const params = 1;
  const [matchs, setMatchs] = useState([]);
  const navigate = useNavigate();
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

  // [GET] /api/users/{match_id}
  useEffect(() => {
    // params 있을때만 유저데이터 가져오기
    if (params) {
      ChatAPI.getChatRoom(params)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.log("채팅방 리스트 조회 실패", error);
        });
    }
  }, [params]);

  return (
    <UserListWrapper>
      <ChannelInfo>
        채팅방 목록
        <FiLogOut onClick={exitChannel} />
      </ChannelInfo>
      <ChannelListWrapper>
      {matchs.map((match) => (
        <div key={match.match_id}>
          <ChannelIcon>{match.place[0]}</ChannelIcon>
        </div>
      ))}
      </ChannelListWrapper>
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
const ChannelListWrapper = styled.section`
`;

const ChannelIcon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background-color: "#8ACCE4";
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
  font-size: 18px;
  font-weight: 600;
  background-color: #8ACCE4;
`;

export default UserList;
