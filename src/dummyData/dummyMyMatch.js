import you from '../asset/profileYou.png';


const dummyMyMatch = [
  {
    id: 0,
    matchState: 'reserved',
    matchDay: '2022.08.27 (토)',
    matchTime: '11:00 ~ 12:00',
    matchPlace: '한숲볼링센터',
    matchPlaceDetail: '서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호',
    matchDesc: '30대 남자입니다. 같은 레벨 구합니다',
    matchIntakeFull: 4,
    matchIntakeCnt: 4,
    hostNickname: 'sparta12',
    hostProfileImage: you,
    hostLevel: '상급',
    hostTemp: 69
  },
  {
    id: 1,
    matchState: 'recruit',
    matchDay: '2022.09.10 (토)',
    matchTime: '11:00 ~ 12:00',
    matchPlace: '성대볼링센타',
    matchPlaceDetail: '서울 동작구 상도로 102 성대시장 3층',
    matchDesc: '남녀 무관합니다.',
    matchIntakeFull: 4,
    matchIntakeCnt: 3,
    hostNickname: '동 윤',
    hostProfileImage: you,
    hostLevel: '입문',
    hostTemp: 69
  },
  {
    id: 2,
    matchState: 'recruit',
    matchDay: '2022.09.11 (일)',
    matchTime: '13:00 ~ 13:30',
    matchPlace: '보라매볼링장',
    matchPlaceDetail: '서울 동작구 보라매로5가길 16 아카데미 타워 7층',
    matchDesc: '주말에 함께 볼링 치실 분들 찾습니다. 남녀 무관합니다.',
    matchIntakeFull: 2,
    matchIntakeCnt: 1,
    hostNickname: '대 우',
    hostProfileImage: you,
    hostLevel: '중급',
    hostTemp: 69
  },
  {
    id: 3,
    matchState: 'done',
    matchDay: '2022.08.20 (토)',
    matchTime: '13:00 ~ 13:30',
    matchPlace: '동작 볼링장',
    matchPlaceDetail: '상세 주소',
    matchDesc: '안녕하세요',
    matchIntakeFull: 2,
    matchIntakeCnt: 2,
    hostNickname: '영 준',
    hostProfileImage: you,
    hostLevel: '초급',
    hostTemp: 69
  },
]

export default dummyMyMatch;