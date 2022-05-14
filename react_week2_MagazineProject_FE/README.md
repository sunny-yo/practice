# React week2-3 : Magazine

1. firebase 사용 (firebaseAuth, firestore)
1. mock api 사용
1. 백엔드와 협업(Spring)

<br />

### 페이지 및 기능

- 메인
  - 게시글 목록 불러오기(작성자, 작성시간, 이미지미리보기, 텍스트)
  - 무한 스크롤
  - 클릭하면 상세페이지 이동
  - 좋아요(분홍색, 회색)
- 게시글 작성, 수정
  - 레이아웃 선택(3가지 중 하나)
  - 입력 안된 게 있으면 게시글 작성 버튼 x
  - 작성 완료시 메이페이지로 이동
- 상세 게시글
  - 선택한 레이아웃대로 표기
  - 수정
  - 삭제
  - 좋아요(분홍색, 회색)
- 회원가입
  - 이메일형식, 비밀번호 체크
  - 필수입력
  - 이메일, 닉네임, 비밀번호
- 로그인
  - 이메일, 패스워드 미기입시 로그인 X

<br />

- 예외처리
  - 로그인 한 사용자가 회원가입, 로그인 페이지에 접속 X
  - 로그인 하지 않은 사용자는 좋아요 버튼 X
- 파이어베이스, S3로 배포

<br />

### 최적화

- 무한 스크롤
  - lodash 라이브러리의 debounce 기능 사용하여 구현 -> intersection observer api 사용한 구현으로 변경
- 코드 스플리팅
  - React.lazy 사용
  - Route level에서 적용
- 이미지 레이지 로딩
  - intersection observer api 사용

<br />

### 라이브러리

- redux
- redux-toolkit
- react-redux
- redux-logger
- firebase
- firebase-tools
- axios
- lodash
- react-router-dom
- styled-components
- react-icons
