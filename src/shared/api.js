import { getCookie } from "./axios_d/cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem("token");
const api = axios.create({
  baseURL: "http://3.38.191.6",
});

export const apis = {
  //user

  login: (id, pw) => api.post("/api/auth/login", { username: id, password: pw }),
  logout: () =>
    api.delete("/api/auth/logout", {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),
  signup: (id, nickname, pw, pwcheck) =>
    api.post("/api/auth/signup", {
      username: id,
      nickname: nickname,
      password: pw,
      passwordCheck: pwcheck,
    }),

  idcheck: (username) => api.get(`user/username/${username}`),

  nicknamecheck: (nickname) => api.get(`user/nickname/${nickname}`),

  islogin: () =>
    api.get("/api/isLogin", {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),

  getAllUser: () =>
    api.get("/api/users", {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),
};

export const ChatAPI = {
  // 채널 목록 조회
  // getChatRoom: (region, sports) =>
  //   api.get(`/api/match/list/${region}/${sports}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //     },
  //   }),
    getChatRoom: () =>
    api.get(`/api/match/list/1/bowling`, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),



  // 매치 추가하기
  addChatRoom: (room) =>
    api.post("/api/channel", room, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),

  // 채널 삭제하기
  exitChatRoom: (match_id) =>
    api.delete(`/api/match/delete/${match_id}`, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),

  // 채널 접속하기
  enterRoom: (match_id) =>
    api.get(`/entry/${match_id}`, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),

  getUserList: (match_id) =>
    api.get(`/api/channel/userlist/${match_id}`, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
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
          // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          Authorization: `Bearer ${getCookie("mytoken")}`,
        },
      }
    ),

  // 채팅 메세지 가져오기
  getMessage: (match_id) =>
    api.get(`/chat/message/${match_id}`, {
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Authorization: `Bearer ${getCookie("mytoken")}`,
      },
    }),
};
