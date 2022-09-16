import profile from '../asset/defaultprofile.jpg';
import you from '../asset/profileYou.png';

//불러온 채팅방 내의 채팅내용
const dummyContents = [
  {
    id: 0,
    profileImage: profile,
    nickname: '영동',
    content: '안녕하세요.'
  },
  {
    id: 1,
    profileImage: you,
    nickname: 'sparta12',
    content: '저랑 한판 하실래요?'
  },
  {
    id: 2,
    profileImage: profile,
    nickname: '영동',
    content: '음... 고민이 되네요...'
  },
  {
    id: 3,
    profileImage: you,
    nickname: 'sparta12',
    content: '고민해보세요 그러면.'
  },
];

//matchId, chatId가 0인 채팅방 데이터
const chatData_0 = {
    chatId: 0,
    status: 'reserved',
    matchDay: '2022.09.8',
    matchTime: '13시',
    matchPlace: '사당 볼링장',
    hostNickname: 'sparta13',
    hostProfileImage: profile,
    intakeCnt: 4,
    intakeFull: 4,
    reservedPeople: [
      {
        reservedId: 0,
        profileImage: profile,
        nickname: '대우',
      },
      {
        reservedId: 1,
        profileImage: profile,
        nickname: '영준',
      },
      {
        reservedId: 2,
        profileImage: profile,
        nickname: '상우',
      },
    ],
    chatContents: dummyContents,
};
//matchId, chatId가 1인 채팅방 데이터
const chatData_1 = {
    chatId: 1,
    status: 'recruit',
    matchDay: '2022.09.15',
    matchTime: '11시',
    matchPlace: '동작 볼링장',
    hostNickname: 'sparta13',
    hostProfileImage: profile,
    intakeCnt: 2,
    intakeFull: 3,
    reservedPeople: [
      { 
        reservedId: 0,
        profileImage: profile,
        nickname: '대우',
      },
    ],
    chatContents: dummyContents,
};
//matchId, chatId가 2인 채팅방 데이터
const chatData_2 = {
    chatId: 2,
    status: 'recruit',
    matchDay: '2022.09.15',
    matchTime: '15시',
    matchPlace: '동작 볼링장',
    hostNickname: 'sparta12',
    hostProfileImage: profile,
    intakeCnt: 2,
    intakeFull: 2,
    reservedPeople: [
    ],
    chatContents: dummyContents,
};
//프론트 로직을 위한 것
//chatId에 따라 뿌려주기 위함
export const dummyChatDatas = [ chatData_0, chatData_1, chatData_2 ];

//chatPage 왼쪽에 채팅방 리스트를 위한 데이터
export const dummyChatList = [
  {
    chatId: 0,
    profileImage: you,
    nickname: '영준',
    lastContent: '실력 비슷한 것 같은데 저랑 하시죠'
  },
  {
    chatId: 1,
    profileImage: null,
    nickname: '영준',
    lastContent: '이거이거 기대가 되는구만요'
  },
  {
    chatId: 2,
    profileImage: you,
    nickname: '영준',
    lastContent: '마 함 뜨자'
  },
];












// const chatData_0 = {
//   chatId: 0,
//   status: 'reserved',
//   matchDay: '2022.09.8',
//   matchTime: '13시',
//   matchPlace: '사당 볼링장',
//   hostNickname: 'sparta13',
//   hostProfileImage: profile,
//   intakeCnt: 4,
//   intakeFull: 4,
//   participants: [
//     { 
//       participantId: 0,
//       profileImage: profile,
//       nickname: '대우',
//     },
//     { 
//       participantId: 1,
//       profileImage: profile,
//       nickname: '영준',
//     },
//     { 
//       participantId: 2,
//       profileImage: profile,
//       nickname: '상우',
//     },
//     { 
//       participantId: 3,
//       profileImage: profile,
//       nickname: '동윤',
//     },
//     { 
//       participantId: 4,
//       profileImage: profile,
//       nickname: '성원',
//     },
//   ],
//   reservedPeople: [
//     {
//       reservedId: 0,
//       profileImage: profile,
//       nickname: '대우',
//     },
//     {
//       reservedId: 1,
//       profileImage: profile,
//       nickname: '영준',
//     },
//     {
//       reservedId: 2,
//       profileImage: profile,
//       nickname: '상우',
//     },
//   ],
//   chatContents: dummyContents,
// };