
# **⚽️🏀⚾️🏈 동네 한판 ⚽️🏀⚾️🏈**

운동은 하고 싶은데 같이 할 사람을 찾고 계신가요? **동네한판**과 함께하세요

- 목차
    [1.💁‍♂️ 프로젝트 소개](#💁‍♂️-프로젝트-소개)  
    [2.🤝 협업을 위한 합의](#🤝-협업을-위한-합의)  
    [3.🏗-아키텍쳐](#🏗-아키텍쳐)  
    [4.📄-주요-기술](#📄-주요-기술)  
    [5.🚫-트러블-슈팅](#🚫-트러블-슈팅)  
    [6.📬-github-주소](#📬-github-주소)  
    [7.🧑🏻‍💻👩🏻‍💻-팀원-소개-🧑🏻‍💻👩🏻‍💻](#🧑🏻‍💻👩🏻‍💻-팀원-소개-🧑🏻‍💻👩🏻‍💻)  


## 💁‍♂️ 프로젝트 소개 
    이번 주말 스포츠를 즐기고 싶은데 함께 할 사람이 없다.
    동네 한판 에 들어가서 동네의 주민들과 원하는 스포츠를 즐기자.
    즐기다보면 생기는 나의 승률, 친구까지,
    어쩌면 이 주의 랭킹에 들어갈지도?

[**동네 한판** 하러가기](http://dongne-hanpan.com) [👉](http://dongne-hanpan.com)  
[동네한판 노션](https://www.notion.so/2a0bb15894b54683beb21d76ebcac89b)
### 서비스 카테고리  
스포츠, 건강 및 피트니스, 라이프스타일

### 제공하는 서비스
서울 지역 기반으로 운동을 함께 즐길 사람을 연결해주는 서비스  
자신의 점수를 입력하여 관리 할 수 있고,  
이를 통해 비슷한 실력의 사람들과 운동을 즐길 수 있는 서비스  

### 동네한판의 핵심기능
- 매치 신청, 수락, 거절에 대한 실시간 알림 구현
- 매치 별 실시간 채팅 구현
- 나의 결과를 입력하여 점수를 관리할 수 있는 기능
- 같은 매치를 함께한 유저 평가

## 🤝 협업을 위한 합의 
- 언어: 

        JavaScript
- 라이브러리:  

        react | react-router-dom | styled-component  
        @reduxjs/toolkit | axios | stompjs | sockjs-client
- 배포환경:

        GitHub Actions ➡️ EC2 
- 협업 툴:  

        GitHub / Notion / Figma / Slack    

- 협업 방식:

        Git-flow | Airbnb 코딩 컨벤션
- 역할:

        김영동: 
            1. Figma를 활용한 와이어프레임, 디자인 
            2. 프로젝트 내 모든 View 구현
            3. redux toolkit, Axios를 활용한 프로젝트 내 모든 Basic Logic 구현
            4. Web Socket 채팅 안정화
            5. SSE를 활용한 알람기능 구현
            6. 서비스를 위한  AWS EC2 배포
            7. GitHub Actions을 활용한 CI/CD 통합
            8. 에러 핸들링
            9. 리펙토링
            10. 성능개선
            11. 사용자 피드백 과정에서 나타난 버그 수정
        최영준:
            1. Web Socket을 활용한 채팅 기반 구현
            2. 테스트용 S3 배포
        (이탈): 
            협업 중 캠프 하차
## 🏗 아키텍쳐
<img src="https://user-images.githubusercontent.com/98384132/194033924-a71352e6-8545-4b7c-a785-cec0021c718b.jpg" width="600">
    
## 📄 주요 기술
###  재사용가능한 컴포넌트
- [🤔Wiki(FE: 재사용가능한 컴포넌트 만들기) 바로가기](https://github.com/dongne-hanpan/FE/wiki/FE:---%EC%9E%AC%EC%82%AC%EC%9A%A9%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)

- **팀원의 이탈로 인해 인적 리소스 부족**  
    재사용성이라는 리액트의 특성을 살린 효율적인 개발이 필요  
    Atomic Design System을 기반으로  
    재사용 가능한 컴포넌트를 고려하여 와이어프레임 디자인 (Figma)  

- **Styled-components**  
    theme, GlobalStyle을 통해 전역적인 세팅
    의존성을 줄인 컴포넌트 별 css 작업
    js 문법 사용 가능 => 하나의 컴포넌트에서 다양한 모습 연출 가능

- **Reuseable Components**  
    재사용되는 컴포넌트는 'Reuse_'라는 접두사를 붙여서 생성
    reuseable이라는 폴더에 분리 관리
    사용하는 곳에서 주입할 수 있는 속성을 부여해서
    하나의 컴포넌트지만 다양하게 변화하며 사용 가능

### Axios, redux toolkit
- **Axios**  
    다양한 에러처리에 용이  
    (서버에서 에러를 보낼 경우, 요청 자체가 실패할 경우, 예상하지 못한 에러가 발생할 경우)  
    wiki 링크  

- **Redux toolkit**  
- **[FE: 전역상태 관리 tool 선택의 과정](https://github.com/dongne-hanpan/FE/wiki/FE:-%EC%A0%84%EC%97%AD%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-tool-%EC%84%A0%ED%83%9D%EC%9D%98-%EA%B3%BC%EC%A0%95F)**
    전역 상태 관리가 필요
    redux에 비해 보일러 플레이트가 적음
    내장된 redux-thunk

### Server-Sent-Event을 이용한 알람기능
- **Eventsource를 이용해 구현**  
    client에서 보내는 정보는 각 action에 대해 백엔드에서 처리
    client는 정보를 받기만 하기에 Web-Socket이 아닌 SSE를 활용

### 카카오 소셜 로그인
- **네이버와 비교**  
    네이버는 검색 엔진이라는 인식 강함.  
    사람들과 연락하고 채팅기능이 있는 서비스임을 고려해  
    서비스 사용과 결을 함께하는 카카오 로그인을 사용하기로 결정  
    각 유저들의 프로필사진, 닉네임이 섬세하게 설정되어있을 가능성이 더 높다.

### 네이버 지도 API
- **카카오 지도와 비교**  
    script 설정에 따라 변하는 브라우저 별 다른 시간 지연
    geolocation 관련 api 사용 시  
    브라우저 별로 다른 http/https 지원 등의 이유로  
    (현 서비스 https 미지원)  
    네이버 지도에 한표

- **쾌적한 UI**  
    현 서비스에서 지도 API가 사용되는 부분은 매우 미미함  
    상대적으로 작은 Modal 창에서 국소적인 기능을 하는 지도 API이기에  
    성능, 가격의 지표보다 UI가  
    서비스 선택 과정에서 더 크게 작용  

### Web Socket을 이용한 채팅
- 양방향 통신을 위해 Web Socket 사용

## 🚫 트러블 슈팅
### 🤔 FE: Axios 에러 핸들링을 어디서 할 것인가?
- **[상세내용이 담긴 Wiki 바로가기](https://github.com/dongne-hanpan/FE/wiki/FE:-Axios-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81%EC%9D%84-%EC%96%B4%EB%94%94%EC%84%9C-%ED%95%A0-%EA%B2%83%EC%9D%B8%EA%B0%80%3F)**
### 🤔 FE: 리펙토링 및 성능 개선
- **[상세내용이 담긴 Wiki 바로가기](https://github.com/dongne-hanpan/FE/wiki/FE:-%EB%A6%AC%ED%8E%99%ED%86%A0%EB%A7%81-%EB%B0%8F-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0)**
### 🤔 Web Socket 연결 불안정
- **상황 :**
    Web Socket을 연결하고 채팅을 시도하는데, 연결을 확인했음에도 불구하고  
    매우 잦은 빈도로 2 가지의 에러가 발생  
    가장 큰 문제는 같은 코드이지만  
    해당 에러가 시도하는 사람의 환경에 따라 에러 발생 빈도가 매우 다르다는 점  
-  **해결**  
    채팅 기능을 담당한 팀원의 로컬 환경에서는 에러가 나지 않아 개선할 수 없었고  
    에러를 빈번하게 마주하는 팀원이 코드를 뜯어보고 안정화 시켰다.  

    웹소켓에 의해 변경되는 state 값이
    웹소켓 연결, 전송 쪽 로직에 무분별하게 자리잡고 있었고
    연결, 전송 혹은 전달을 받을 때마다 state가 변경되어
    web socket의 연결이 단절, 재연결이 반복되었고, 
    미처 다시 연결이 설립되기 전에 유저가 전송을 시도할 경우 해당 에러가 발생했다.
- **❓왜 로컬환경에 따라 다른 에러 빈도가 발생했을까?**  
    각 로컬환경에서 가진 컴퓨터의 성능 차이가 아닐까 추측본다.
### 🤔 SSE 통신 중 state 값의 초기화
- **상황 :**  
    SSE 통신을 통해 알람을 받아  
    해당 컴포넌트 내에서 선언된 state에 쌓는 것을 시도  
    state 내의 값이 쌓이지 않고 초기화되는 현상 발생  
- useState의 첫 선언 시 들어가는 기본 값도 무시한 채 값이 초기화되고  
    새로 받아온 값이 기존 state 값으로 대체 됨.  
    state의 값이 초기화되는 현상을 감지하기 위한 useEffect도 무시  

- 부모 컴포넌트에서 state를 선언하고 props를 전달하는 방법을 시도  
    => 여전히 초기화 되어 대체 됨.
- redux의 action을 통해 store에 값을 저장  
    => 완벽하게 에러에 대해 파헤쳐 이해하고 해결한 것은 아니지만,  
    => 우회하는 방법으로 해결


## 📬 GitHub 주소
[**Front-End Github**](https://github.com/dongne-hanpan/FE)  
[**Back-End Github**](https://github.com/dongne-hanpan/Backend)



### 🧑🏻‍💻👩🏻‍💻 팀원 소개 🧑🏻‍💻👩🏻‍💻
| Name            | GitHub                           | @Email                  |
|-----------------|----------------------------------|-------------------------|
| 김영동:FE (부조장)  | https://github.com/youngdong82   | nfs82young@gmail.com    |
| 최영준:FE         | https://github.com/IngJun        | chdo5@naver.com         |
| 김동윤:BE (조장)   | https://github.com/kdy-git       | zinee2001@naver.com     |
| 곽대우:BE         | https://github.com/dae-woo       | sansachia312@gmail.com  |
| 조상우:BE         | https://github.com/csw96         | sangwcho96@naver.com    |
