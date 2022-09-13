//tmp
import you from '../asset/profileYou.png';
import me from '../asset/profileMe.png';

const dummyUserDetail = {
  profileImage: you,
  nickname: '영동',
  level: '상급',
  sports: ['테니스', '볼링', '배드민턴', '달리기', '축구'],//매치 기록이 있을 때
  friends: [
    {
      profileImage: me,
      nickname: '동윤'
    },
    {
      profileImage: null,
      nickname: '상우'
    },
  ],//최대 7명까지 랜덤으로
  rank:{
    average: 73,
    matchcount: 2,
    temperature: 58
  }
};

export default dummyUserDetail;