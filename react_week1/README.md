# React week1 : My Dictionary

### yarn add

- react-router-dom : 페이지 router 연결
- redux / react-redux / redux-thunk : 전역 상태 관리
- firebase : firestore 사용
- firebase-tools : firebase hosting
- styled-components
- react-icons

- \+ redux-toolkit

### - redux-toolkit 사용해보기

> 추가로 드는 생각 : firestore를 사용할 때, 데이터 가공을 `firestore.js`에서 데이터 통신할 때 한 번, `wordsSliceFB.js`에서 extraReducer에서 한 번 해서 두 번 따로 하게 되어 있는데 애초에 thunk에서 받아서 가공해서 각자에게 보내주면 좋을 것 같다. (이번에는 배우기 위해 순서대로 하면서 작성된 코드를 수정하지 않고 하다보니 그렇게 되었다.)
