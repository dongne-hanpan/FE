import { useNavigate } from "react-router";
import { apis } from "../../shared/api";
import styled from "styled-components";


const ChannelHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    apis
      .logout()
      .then((res) => {
        window.localStorage.removeItem("username");
        sessionStorage.removeItem("token");

        navigate("/");
      })
      .catch((e) => {
        console.log("로그아웃 실패");
      });
  };

  return (
    <ChannelHeaderWrapper>
      <LogoutButton onClick={logout}>로그아웃</LogoutButton>
    </ChannelHeaderWrapper>
  );
};



const ChannelHeaderWrapper = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: 0.1px solid grey;
  background-color: ${(props) => props.theme.palette.deep_blue};
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
`;

const LogoutButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: inherit;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;


export default ChannelHeader;
