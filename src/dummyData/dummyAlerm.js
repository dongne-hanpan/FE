//permit은 수락 눌렀을때,
// 알림 받을때는 request

const dummyAlerms = [
  {
    id: 1,
    type: 'normal',
    checked: true,
    msg: '최영준 님이 친구 신청을 보냈습니다.'
  },
  {
    id: 2,
    type: 'normal',
    checked: false,
    msg: '곽대우 님이 친구 신청을 보냈습니다.'
  },
  // {
  //   id: 3,
  //   type: 'choose',
  //   checked: false,
  //   msg: '김동윤 님이 매치 신청을 보냈습니다.',
  //   matchId:,
  //   applyUser:{
  //     nickname:,
  //     profileImage,
  //     level:,
  //     mannerPoint,
  //   },
  // },
  {
    id: 4,
    type: 'choose',
    checked: true,
    msg: '곽대우 님이 친구 신청을 보냈습니다.'
  },
  {
    id: 5,
    type: 'normal',
    checked: true,
    msg: '곽대우 님이 친구 신청을 보냈습니다.'
  },
  {
    id: 6,
    type: 'normal',
    checked: true,
    msg: '곽대우 님이 친구 신청을 보냈습니다.'
  },
];

export default dummyAlerms;