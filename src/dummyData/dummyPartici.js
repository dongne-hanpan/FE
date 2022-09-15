import profile from '../asset/defaultprofile.jpg';
import you from '../asset/profileYou.png';


export const dummyPartici = [
  { 
    id: 0,
    profileImage: profile,
    nickname: '대우',
  },
  { 
    id: 1,
    profileImage: profile,
    nickname: '영준',
  },
  { 
    id: 2,
    profileImage: profile,
    nickname: '상우',
  },
];

export const dummyContents = [
  {
    id: 0,
    isMe: true,
    profileImage: profile,
    nickname: '영동',
    content: '안녕하세요.'
  },
  {
    id: 1,
    isMe: false,
    profileImage: you,
    nickname: 'sparta12',
    content: '저랑 한판 하실래요?'
  },
  {
    id: 2,
    isMe: true,
    profileImage: profile,
    nickname: '영동',
    content: '음... 고민이 되네요...'
  },
  {
    id: 3,
    isMe: false,
    profileImage: you,
    nickname: 'sparta12',
    content: '고민해보세요 그러면.'
  },
]