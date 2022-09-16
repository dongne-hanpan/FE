import { useParams } from "react-router";
import styled from "styled-components";
import ChattingTitle from "../components/chatPage/ChattingTitle";
import ChannelList from "../components/chatPage/ChannelList";
import ChattingList from "../components/chatPage/ChattingList";
import UserList from "../components/chatPage/UserList";

const ChatPage = () => {
  const params = useParams().match_id;
  console.log(params)
  return (
    <MainPageWrapper>
      <ChattingTitle />
      <BodyWrapper>
        <MenuWrapper>
          <ChannelList />
          {params ? <UserList /> : null}
        </MenuWrapper>
        {params ? (
          <ChattingWrapper>
            <ChattingList></ChattingList>
          </ChattingWrapper>
        ) : null}
      </BodyWrapper>
    </MainPageWrapper>
  );
};

export default ChatPage;

const MainPageWrapper = styled.div`
  width: 830px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: "#0FFFCF1";
  position:relative;
  left:33%;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const MenuWrapper = styled.div`
  width: 320px;
  height: 100%;
  border-right: 0.1px solid grey;
  display: flex;
  background-color: "#8ACCE4";
`;
const ChattingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
