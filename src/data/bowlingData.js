const dummyOptionValues = [
  { value:'장소 선택', address: "default" },
  { value:'한숲볼링센터', address: "서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호" },
  { value:'성대볼링센타', address: "서울 동작구 상도로 102 성대시장 3층" },
  { value:'보라매볼링장', address: "서울 동작구 보라매로5가길 16 아카데미 타워 7층" }
]
export const bowlingAddress = {
  1:[
    { region: '강남구', value:'스매싱볼 강남점', address: "서울 강남구 강남대로 468 충림빌딩" },
    { region: '강남구', value:'스매싱볼 청담점', address: "서울 강남구 선릉로 818 지하2층 스매싱볼 청담점" },
    { region: '강남구', value:'글로우 스트라이크', address: "서울 강남구 도산대로 232" },
    { region: '강남구', value:'스타24시볼링장', address: "서울 강남구 논현로 641 B1" },
    { region: '강남구', value:'라인볼링장', address: "서울 강남구 강남대로 308 랜드마크타워 지하2층" },
    { region: '강남구', value:'텐핀모두의볼링', address: "서울 강남구 테헤란로79길 6 5층" },
  ],
  2:[
    { region: '강동구', value:'스핀볼링장', address: "서울 강동구 올림픽로 664 대우한강베네시티 지하2층" },
    { region: '강동구', value:'놀자GO볼링장', address: "서울 강동구 천호대로157길 14 나비쇼핑몰 5층" },
    { region: '강동구', value:'가인볼링장', address: "서울 강동구 양재대로113길 51 우성아트빌" },
    { region: '강동구', value:'길동 볼링장', address: "서울 강동구 양재대로 1458" },
  ],
  3:[
    { region: '강북구', value:'킹콩스트라이크', address: "서울 강북구 한천로139길 42" },
    { region: '강북구', value:'더블유볼링', address: "서울 강북구 도봉로 342 4층" },
    { region: '강북구', value:'알엔비볼링장', address: "서울 강북구 도봉로 34 트레지오 8층" },
    { region: '강북구', value:'볼링펍 CGV수유점', address: "서울 강북구 도봉로 399 CGC수유 3층" },
    { region: '강북구', value:'럭키볼링센터', address: "서울 강북구 한천로 1013" },
    { region: '강북구', value:'우이볼링장', address: "서울 강북구 삼양로 424" },
  ],
  4:[
    { region: '강서구', value:'타워락볼링장', address: "서울 강서구 마곡중앙6로 16 8층 타워락볼링장" },
    { region: '강서구', value:'볼원볼링장 발산역점', address: "서울 강서구 강서로54길 42 2층,3층" },
    { region: '강서구', value:'파인락볼링장', address: "서울 강서구 마곡중앙4로 22 파인스퀘어 지하1층" },
    { region: '강서구', value:'도전볼링장', address: "서울 강서구 공항대로 593 3동 지하1층 B103호" },
    { region: '강서구', value:'파크볼링장', address: "서울 강서구 공항대로 213 보타닉파크타워2 B1" },
    { region: '강서구', value:'강서볼링장', address: "서울 강서구 양천로 706 태진가람상가 지하1층" },
    { region: '강서구', value:'주영볼링센터', address: "서울 강서구 양천로 461 주영빌딩" },
    { region: '강서구', value:'몬스터볼', address: "서울 강서구 공항대로41길 34" },
    { region: '강서구', value:'정곡볼링장', address: "서울 강서구 양천로26길 18" },
  ],
  5:[
    { region: '관악구', value:'제이앤제이볼링센터', address: "서울 관악구 신림로 340 르네상스복합쇼핑몰" },
    { region: '관악구', value:'삼모볼링장', address: "서울 관악구 신림로59길 23 삼모스포렉스빌딩 6층 볼링장" },
  ],
  6:[
    { region: '광진구', value:'동서울그랜드볼링센터', address: "서울 광진구 강변역로 50 동서울터미널 6층" },
    { region: '광진구', value:'한아름볼링프라자', address: "서울 광진구 능동로13길 39" },
  ],
  7:[
    { region: '구로구', value:'더블루볼링장', address: "서울 구로구 디지털로32나길 38" },
    { region: '구로구', value:'MK볼링센터 구로점', address: "서울 구로구 구로중앙로 134 신구로자이 나인스에비뉴" },
    { region: '구로구', value:'앵커스 볼링라운지', address: "서울 구로구 디지털로31길 12 지하 1층 앵커스 볼링라운지" },
    { region: '구로구', value:'GD볼링장', address: "서울 구로구 경인로 397 지하 1,2층" },
    
  ],
  8:[
    { region: '금천구', value:'G2 Zone 볼링장', address: "서울 금천구 벚꽃로 266 마리오아울렛3관 11F" },
    { region: '금천구', value:'위너스볼링장', address: "서울 금천구 시흥대로 296" },
    { region: '금천구', value:'크로바볼링장', address: "서울 금천구 시흥대로 440" },
    { region: '금천구', value:'아미고볼링', address: "서울 금천구 시흥대로 399 지하1층" },
  ],
  9:[
    { region: '노원구', value:'더블랙볼링장', address: "서울 노원구 노해로 507 와우쇼핑몰 지하1층" },
    { region: '노원구', value:'24시 블랙홀 볼링센터', address: "서울 노원구 화랑로 325 4층 우현빌딩" },
    { region: '노원구', value:'그린라이트 볼링장', address: "서울 노원구 상계로 55 위성프라자" },
    { region: '노원구', value:'공릉볼링센터', address: "서울 노원구 동일로180길 14" },
    { region: '노원구', value:'건영볼링센터', address: "서울 노원구 섬밭로 258 건영백화점 지하2층 건영볼링센터" },
    { region: '노원구', value:'볼러스레인', address: "서울 노원구 동일로204가길 34" },
    { region: '노원구', value:'그린라이트 감성펍 볼링장', address: "서울 노원구 상계로 55" },
  ],
  10:[
    { region: '도봉구', value:'미화볼링장', address: "서울 도봉구 도봉로 578" },
    { region: '도봉구', value:'쌍문나이스락볼링센터', address: "서울 도봉구 도봉로114길 22-8 지하1층" },
    { region: '도봉구', value:'창동JJ볼링장', address: "서울 도봉구 해등로 125 4층" },
    { region: '도봉구', value:'트윈스볼링장', address: "서울 도봉구 도당로 6" },
    { region: '도봉구', value:'스윙볼링장', address: "서울 도봉구 도당로 75 세계로 마트 건물 4층" },
  ],
  11:[
    { region: '동대문구', value:'장안퍼펙트볼링센터', address: "서울 동대문구 장한로2길 33 지하1층" },
    { region: '동대문구', value:'스타 레인즈 볼링장', address: "서울 동대문구 천호대로 405 동보빌딩 지하 3층" },
    { region: '동대문구', value:'우창볼링센터', address: "서울 동대문구 망우로 123 지하 1층" },
  ],
  12:[
    { region: '동작구', value:'한숲볼링센터', address: "서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호" },
    { region: '동작구', value:'성대볼링센타', address: "서울 동작구 상도로 102 성대시장 3층" },
    { region: '동작구', value:'보라매볼링장', address: "서울 동작구 보라매로5가길 16 아카데미 타워 7층" }
  ],
  13:[
    { region: '마포구', value:'태화볼링장', address: "서울 마포구 와우산로 111" },
    { region: '마포구', value:'홍대볼링장', address: "서울 마포구 양화로 156 308호" },
    { region: '마포구', value:'스매싱볼 홍대점', address: "서울 마포구 독막로7길 48" },
    { region: '마포구', value:'W락볼링장', address: "서울 마포구 양화로 104 지하1층" },
    { region: '마포구', value:'클럽스트라이크 볼링장', address: "서울 마포구 마포대로 52 4층 클럽스트라이크" },
    { region: '마포구', value:'마포구민체육센터', address: "서울 마포구 월드컵로25길 190" },
  ],
  14:[
    { region: '서대문구', value:'스카이락볼링장', address: "서울 서대문구 신촌로 73 케이스퀘어 8층" },
    { region: '서대문구', value:'타겟볼링', address: "서울 서대문구 신촌역로 10 혜우빌딩" },
    { region: '서대문구', value:'뉴원일볼링센터', address: "서울 서대문구 수색로 48 대화빌딩" },
    { region: '서대문구', value:'충암볼링장', address: "서울 서대문구 명지대길 103" },
  ],
  15:[
    { region: '서초구', value:'템플스트라이크', address: "서울 서초구 강남대로61길 13 지하1층 템플스트라이크" },
    { region: '서초구', value:'스매싱볼 사당점', address: "서울 서초구 방배천로2길 10 지하 1층" },
    { region: '서초구', value:'오란다볼링파크', address: "서울 서초구 방배로33길 29 방배한신트리플 B1" },
    { region: '서초구', value:'코오롱스포렉스 서초점', address: "서울 서초구 서초대로70길 32 코오롱스포렉스" },
    { region: '서초구', value:'로얄볼링센타', address: "서울 서초구 방배로13길 18 방배아크로타워 지하 1층" },
    { region: '서초구', value:'노블레스볼링장', address: "서울 서초구 서초대로 350 지하2층 노블레스볼링장" },
    { region: '서초구', value:'금성볼링장', address: "서울 서초구 서초중앙로 85 가산빌딩" },
  ],
  16:[
    { region: '성동구', value:'유니온스타볼링클럽', address: "서울 성동구 연무장7길 12 세대빌딩, B1/B2층" },
    { region: '성동구', value:'희소볼링장', address: "서울 성동구 뚝섬로 447 지하1층" },
    { region: '성동구', value:'라인볼링센터', address: "서울 성동구 고산자로6길 40 지하 3층" },
  ],
  17:[
    { region: '성북구', value:'성신볼링장', address: "서울 성북구 보문로34길 69 창천프라자" },
    { region: '성북구', value:'유타Bk볼링센타', address: "서울 성북구 동소문로 106 유타빌딩14층" },
    { region: '성북구', value:'YB 볼링센터', address: "서울 성북구 길음로7길 36-12 2층" },
    { region: '성북구', value:'제이제이볼링장', address: "서울 성북구 화랑로 254" },
    { region: '성북구', value:'올핀볼링센터', address: "서울 성북구 장위로 189 지하 1층 올핀볼링센터" },
    { region: '성북구', value:'킹콩스트라이크', address: "서울 강북구 한천로139길 42" },
  ],
  18:[
    { region: '송파구', value:'아우라 락 볼링장', address: "서울 송파구 오금로11길 12 아우라 락 볼링장 지하1층" },
    { region: '송파구', value:'잠실볼링장', address: "서울 송파구 백제고분로 75 지하2층 202호" },
    { region: '송파구', value:'스핀 볼링센터 가든파이브', address: "서울 송파구 충민로 52 가든파이브 웍스관 지하1층 57호" },
    { region: '송파구', value:'팡팡락볼링장', address: "서울 송파구 올림픽로 114" },
    { region: '송파구', value:'제이에스비 서울거여지점', address: "서울 송파구 거마로 14 지하1층" },
    { region: '송파구', value:'에스원볼링센터', address: "서울 송파구 올림픽로 545 에스원볼링센터 2층" },
    
  ],
  19:[
    { region: '양천구', value:'세원볼링센타', address: "서울 양천구 신월로 354" },
  ],
  20:[
    { region: '영등포구', value:'코오롱스포렉스 타임스퀘어점', address: "서울 영등포구 영중로 15 타임스퀘어 5F 501" },
    { region: '영등포구', value:'로얄볼링센터', address: "서울 영등포구 영등포로28길 5 당산동코오롱주.상복합아파트 지하3층" },
    { region: '영등포구', value:'정석볼링장', address: "서울 영등포구 경인로 775 에이스하이테크시티 1동 B143~B146호" },
    { region: '영등포구', value:'퍼스트비앤피 여의도점', address: "서울 영등포구 국회대로 800 진미파라곤 지하2층" },
    { region: '영등포구', value:'동양볼링센터', address: "서울 영등포구 선유로 27 대륭오피스텔" },
    { region: '영등포구', value:'제이앤제이볼링센터', address: "서울 영등포구 영중로 12 에쉐르아이쇼핑몰 6층" },
    { region: '영등포구', value:'브래그볼링센터 영등포점', address: "서울 영등포구 국회대로36길 17 지하1층" },
  ],
  21:[
    { region: '용산구', value:'스매싱볼 이태원점', address: "서울 용산구 이태원로 145 지하1층" },
    { region: '용산구', value:'남영볼링센터', address: "서울 용산구 한강대로 273 용산빌딩" },
    { region: '용산구', value:'어썸라운지볼24', address: "서울 용산구 이태원로 217 현대안성타워 1층" },
    { region: '용산구', value:'뉴청룡볼링장', address: "서울 용산구 한강대로 257 청룡빌딩 지하1층" },
  ],
  22:[
    { region: '은평구', value:'가인볼링센터 은평점', address: "서울 은평구 통일로 1050 4층" },
    { region: '은평구', value:'은평칠텐볼링센터', address: "서울 은평구 서오릉로 94 삼성타운아파트 101동 지하층 101, 102, 103호" },
  ],
  23:[
    { region: '종로구', value:'스매싱볼 종로점', address: "서울 종로구 종로 78" },
    { region: '종로구', value:'제이앤제이볼링센터', address: "서울 종로구 종로12길 15 4층" },
    { region: '종로구', value:'나인티나인', address: "서울 종로구 대학로 144 4층 나인티나인" },
    { region: '종로구', value:'어썸라운지볼24', address: "서울 종로구 성균관로 12 유니지오" },
    { region: '종로구', value:'동아볼링센타', address: "서울 종로구 종로 413 동보빌딩" },
    { region: '종로구', value:'원서레인스', address: "서울 종로구 창덕궁1길 13" },
  ],
  24:[
    { region: '중구', value:'코끼리볼링장', address: "서울 중구 퇴계로 166 흥국빌딩" },
    { region: '중구', value:'엘씨아이볼링장', address: "서울 중구 퇴계로18길 14 프라자빌딩" },
    { region: '중구', value:'굿모닝시티볼', address: "서울 중구 장충단로 247 5층" },
    { region: '중구', value:'볼링볼링', address: "서울 중구 청계천로 400 롯데캐슬베네치아 메가몰동 지하1층" },
    { region: '중구', value:'MONKEY볼링센터', address: "서울 중구 장충단로 253 헬로우APM" },
  ],
  25:[
    { region: '중랑구', value:'삼보볼링장', address: "서울 중랑구 중랑천로10길 76 삼보볼링센타" },
    { region: '중랑구', value:'BK플러스볼링장', address: "서울 중랑구 봉화산로 221 동성타워프라자 지하 2층" },
  ],
}



export default dummyOptionValues;