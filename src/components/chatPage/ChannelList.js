import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import ChannelCreator from "./ChannelCreator";
import Modal from "../../components/chatPage/elements/Modal";
import { ChatAPI } from "../../shared/api";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const ChannelList = () => {
  const [modalToggel, setModlaToggle] = useState(false);
  const params = useParams().channel_id;

  const [channels, setChannels] = useState([]);

  const closeModal = () => {
    setModlaToggle(false);
  };

  const navigate = useNavigate();

  // [GFT] api/channel/list 채널목록 조회
  useEffect(() => {
    console.log(sessionStorage.getItem("token"));
    // console.log("채널 정보 불러오기", params);
    ChatAPI.getChatRoom()
      .then((res) => {
        // console.log("전체 채널 리스트: ", res.data);
        setChannels(res.data);
      })
      .catch((error) => {
        console.log("채널리스트 조회 실패", error);
      });
  }, []);

  return (
    <ChannelListWrapper>
      {channels.map((channel) => (
        <div
          key={channel.channel_id}
          onClick={() => {
            navigate(`/channel/${channel.channel_id}`);
          }}
        >
          <ChannelIcon>{channel.channelName[0]}</ChannelIcon>
        </div>
      ))}
      {/* <PlusIcon
        onClick={() => {
          setModlaToggle(true);
        }}
      >
        <FiPlus></FiPlus>
      </PlusIcon> */}

      <Modal visible={modalToggel} closeModal={closeModal}>
        <ChannelCreator
          visible={modalToggel}
          closeModal={closeModal}
          channels={channels}
          setChannels={setChannels}
        ></ChannelCreator>
      </Modal>
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
  font-size: 24px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.dark_grey};
`;
const PlusIcon = styled(ChannelIcon)`
  font-size: 32px;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
`;


export default ChannelList;
