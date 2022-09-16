import { useEffect, useState } from "react";
import { ChatAPI } from "../../shared/api";
import styled from "styled-components";

const ChannelList = () => {
  const [matchs, setMatchs] = useState([]);

  // [GFT] api/channel/list 채널목록 조회
  useEffect(() => {
    ChatAPI.getChatRoom()
      .then((res) => {
        console.log("전체 채널 리스트: ", res.data);
        setMatchs(res.data);
      })
      .catch((error) => {
        console.log("채널리스트 조회 실패", error);
      });
  }, []);

  return (
    <ChannelListWrapper>
      {matchs.map((match) => (
        <div key={match.match_id}>
          <ChannelIcon>{match.place[0]}</ChannelIcon>
        </div>
      ))}
    </ChannelListWrapper>
  );
};


const ChannelListWrapper = styled.section`
  width: 80px;
  height: 100%;
  padding-top: 10px;
  border-right: 0.1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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


export default ChannelList;
