import { useNavigate } from "react-router";
import { apis } from "../../../shared/redux_j/api";
import { ChannelHeaderWrapper, LogoutButton } from "./style";

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

export default ChannelHeader;
