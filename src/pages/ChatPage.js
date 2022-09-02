import { useParams } from "react-router";
import styled from "styled-components";
import ChannelHeader from "../components/chatPage/ChannelHeader";
import ChannelList from "../components/chatPage/ChannelList";
import ChattingList from "../components/chatPage/ChattingList";
import ChattingTitle from "../components/chatPage/ChattingTitle";
import UserList from "../components/chatPage/UserList";


import Modal from "../components/chatPage/elements/Modal";
import ChannelCreator from "../components/chatPage/ChannelCreator";
import Button from "@material-ui/core/Button";

const ChatPage = () => {
  // const params = useParams().channel_id;
  // return (
  //   <MainPageWrapper>
  //     {/* <ChannelHeader></ChannelHeader> */}
  //     <BodyWrapper>
  //       <MenuWrapper>
          
  //         <ChannelList />
  //         {params ? <UserList /> : null}
  //       </MenuWrapper>
  //       {params ? (
  //         <ChattingWrapper>
  //           <ChattingList></ChattingList>
  //         </ChattingWrapper>
  //       ) : null}
  //     </BodyWrapper>
  //   </MainPageWrapper>
  // );
  return(
    <MainPageWrapper>
      <MenuWrapper>
        <MatchWrapper>
          <ul>username</ul>
          <ul>언제까지 가능하세요?</ul>
        </MatchWrapper>
        <MatchWrapper>
          <ul>username</ul>
          <ul>언제까지 가능하세요?</ul>
        </MatchWrapper>
        <MatchWrapper>
          <ul>username</ul>
          <ul>언제까지 가능하세요?</ul>
        </MatchWrapper>
        <MatchWrapper>
          <ul>username</ul>
          <ul>언제까지 가능하세요?</ul>
        </MatchWrapper>
      </MenuWrapper>
      <ChattingWrapper>
            <ChattingTitle></ChattingTitle>
            <ChattingListDummy>
              <ul>채팅하는 사람입니다.</ul>
              <ul>채팅 내용입니다.</ul>
              <ul>채팅하는 사람입니다.</ul>
              <ul>채팅 내용입니다.</ul>
              <ul>채팅하는 사람입니다.</ul>
              <ul>채팅 내용입니다.</ul>
                <ChattingControlBar>
                <Button
                  variant="contained"
                  style={{
                    height: "44px",
                    fontWeight: "bold",
                    width: "120px",
                    margin: "24px 0px 0px 0px",
                    fontSize: "18px",
                    color: "white",
                    backgroundColor: "green",
                  }}
                  onClick={() => {
                    {
                    console.log("결과입력");
                    }
                  }}
                >
                  결과입력
                  </Button>
                <Button
                variant="contained"
                style={{
                  height: "44px",
                  fontWeight: "bold",
                  width: "120px",
                  margin: "24px 0px 0px 0px",
                  fontSize: "18px",
                  color: "white",
                  backgroundColor: "blue",
                }}
                onClick={() => {
                  {
                  console.log("예약확정");
                  }
                }}
              >
                예약확정
                </Button>
                <Button
                variant="contained"
                style={{
                  height: "44px",
                  fontWeight: "bold",
                  width: "120px",
                  margin: "24px 0px 0px 0px",
                  fontSize: "18px",
                  color: "white",
                  backgroundColor: "red",
                }}
                onClick={() => {
                  {
                  console.log("나가기");
                  }
                }}
              >
                나가기
                </Button>
                <Modal>
                {/* <Modal visible={modalToggel} closeModal={closeModal}> */}
                <ChannelCreator
                  // visible={modalToggel}
                  // closeModal={closeModal}
                  // channels={channels}
                  // setChannels={setChannels}
                ></ChannelCreator>
                </Modal>
              </ChattingControlBar>
            </ChattingListDummy>

            <ChattingInput>
              <TextBox><p>채팅내용입력</p></TextBox>
              <Button
              variant="contained"
              style={{
              height: "44px",
              fontWeight: "bold",
              width: "120px",
              margin: "24px 0px 0px 0px",
              fontSize: "18px",
              color: "white",
              backgroundColor: "skyblue",
              }}
              onClick={() => {
              {
              console.log("전송");
              }
              }}
              >
              전송
              </Button>
            </ChattingInput>
      </ChattingWrapper>


    </MainPageWrapper>

  );
};

export default ChatPage;

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const MenuWrapper = styled.div`
  width: 350px;
  height: 100%;
  border-right: 0.1px solid grey;
  display: flex-column;
  /*background-color: ${(props) => props.theme.palette.blue};*/
`;
const ChattingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: white; */
`;

const ChattingListDummy = styled.div`
  width: 570px;
  height: 400px;
  border: 0.5px solid blue;
  padding: 20px;
  display: flex;
  margin: 5px 5px 5px 5px;
  flex-direction: column;
  background-color: F5EFD8;
`;
const ChattingControlBar = styled.div`
  width: 570px;
  height: 80px;
  display: flex;
  flex-direction: row;
  background-color: F5EFD8;
  justify-content: flex-end;
`;

const ChattingInput = styled.div`
  width: 570px;
  height: 200px;
  border: 0.5px solid blue;
  padding: 20px;
  display: flex;
  margin: 5px 5px 5px 5px;
  flex-direction: column;
  background-color: F5EFD8;
`;

const MatchWrapper = styled.div`
  max-width: 240px;
  max-height: 100px;
  margin: 5px 5px 5px 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #F5EFD8; 
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

const TextBox = styled.div`
  display: flex;
  color: black;
  font-size:16px;
  flex-direction: column;
`;