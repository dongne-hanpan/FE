import axios from "axios";
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem("token");
const api = axios.create({
  baseURL: "http://15.165.158.16/",
});

export const apis = {
  //user

  login: (id, pw) => api.post("/auth/login", { username: id, password: pw }),
  logout: () =>
    api.delete("auth/logout", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),
  signup: (id, nickname, pw, pwcheck) =>
    api.post("/auth/signup", {
      username: id,
      nickname: nickname,
      password: pw,
      passwordCheck: pwcheck,
    }),

  idcheck: (email) => api.get(`user/idCheck/${email}`),

  nicknamecheck: (nickname) => api.get(`user/nicknameCheck/${nickname}`),

  islogin: () =>
    api.get("/api/isLogin", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  getAllUser: () =>
    api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),
};

export const ChatAPI = {
  // 채널 목록 조회
  getChatRoom: () =>
    api.get("/api/channel/list", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  // 채널 추가하기
  addChatRoom: (room) =>
    api.post("/api/channel", room, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  // 채널 삭제하기
  exitChatRoom: (channel_id) =>
    api.delete(`/api/channel/exit/${channel_id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  // 채널 접속하기
  enterRoom: (channel_id) =>
    api.get(`/entry/${channel_id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  getUserList: (channel_id) =>
    api.get(`/api/channel/userlist/${channel_id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }),

  // 유저 초대하기
  inviteUser: (form) =>
    api.post(
      `/api/channel/invite`,
      // { inviteUser: username, channel_id: channel_id },
      form,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    ),

  // 채팅 메세지 가져오기
  // getMessage: (channel_id) =>
  //   api.get(`/message/${channel_id}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //     },
  //   }),
};
