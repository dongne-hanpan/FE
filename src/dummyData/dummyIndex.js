import badminton from '../asset/pictogram_badminton.png';
import bowling from '../asset/pictogram_bowling.png';
import football from '../asset/pictogram_football.png';
import pingpong from '../asset/pictogram_pingpong.png';
import running from '../asset/pictogram_running.png';
import tennis from '../asset/pictogram_tennis.png';


export const dummyRegion = [
  {regionId: 0, region: '전체 지역'},
  {regionId: 1, region: '강남구'},
  {regionId: 2, region: '강동구'},
  {regionId: 3, region: '강북구'},
  {regionId: 4, region: '강서구'},
  {regionId: 5, region: '관악구'},
  {regionId: 6, region: '광진구'},
  {regionId: 7, region: '구로구'},
  {regionId: 8, region: '금천구'},
  {regionId: 9, region: '노원구'},
  {regionId: 10, region: '도봉구'},
  {regionId: 11, region: '동대문구'},
  {regionId: 12, region: '동작구'},
  {regionId: 13, region: '마포구'},
  {regionId: 14, region: '서대문구'},
  {regionId: 15, region: '서초구'},
  {regionId: 16, region: '성동구'},
  {regionId: 17, region: '성북구'},
  {regionId: 18, region: '송파구'},
  {regionId: 19, region: '양천구'},
  {regionId: 20, region: '영등포구'},
  {regionId: 21, region: '용산구'},
  {regionId: 22, region: '은평구'},
  {regionId: 23, region: '종로구'},
  {regionId: 24, region: '중구'},
  {regionId: 25, region: '중랑구'},
];

export const dummySports = [
  {sportsId: 0, sports: '볼링', sportsImage: bowling},
  {sportsId: 1, sports: '테니스', sportsImage: tennis},
  {sportsId: 2, sports: '배드민턴', sportsImage: badminton},
  {sportsId: 3, sports: '풋살', sportsImage: football},
  {sportsId: 4, sports: '탁구', sportsImage: pingpong},
  {sportsId: 5, sports: '달리기', sportsImage: running},
]

export const sportsConverter = (sports) => {
  if(sports === '볼링'){
    return 'bowling';
  } else if(sports === '테니스'){
    return 'tennis';
  } else if(sports === '배드민턴'){
    return 'badminton';
  } else if(sports === '풋살'){
    return 'football';
  } else if(sports === '탁구'){
    return 'pingpong';
  } else if(sports === '달리기'){
    return 'run';
  }
}