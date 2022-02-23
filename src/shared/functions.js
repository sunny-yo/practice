// 회원가입 페이지 입력 체크
// 주석처리한 부분 : 백엔드 구현 요구사항
export const checkEmail = email => {
  if (email === '') {
    return { res: false, msg: '이메일을 입력해주세요' };
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { res: false, msg: '올바른 이메일을 입력해주세요' };
  }
  return { res: true };
};

export const checkNickname = nickname => {
  if (nickname === '') {
    return { res: false, msg: '닉네임을 입력해주세요' };
  }
  // 닉네임 3자 이상, 알파벳 대소문자, 숫자 구성
  // else if (!nickname.length >= 3 || !/^[a-z,A-Z,0-9]{3,}$/.test(nickname)) {
  //   return { res: false, msg: '올바른 닉네임을 입력해주세요' };
  // }
  return { res: true };
};

export const checkPW = (pw, pwCheck, nickname) => {
  const regexNickname = new RegExp(nickname);
  if (pw === '') {
    return { res: false, msg: '비밀번호를 입력해주세요', focus: 'pwRef' };
  } else if (pwCheck === '') {
    return { res: false, msg: '비밀번호를 입력해주세요', focus: 'pwCheckRef' };
  }
  // 최소 4자 이상, 닉네임과 같은 값이 포함된 경우 회원가입 실패
  // else if (pw.length < 4) {
  //   return {
  //     res: false,
  //     msg: '올바른 비밀번호를 입력해주세요',
  //     focus: 'pwRef',
  //   };
  // }
  // else if (pw.match(regexNickname)) {
  //   return {
  //     res: false,
  //     msg: '닉네임이 포함되지 않은 비밀번호를 입력해주세요',
  //     focus: 'pwRef',
  //   };
  // }
  else if (!pw === pwCheck) {
    return {
      res: false,
      msg: '비밀번호를 올바르게 입력했는지 확인해주세요',
      focus: 'pwRef',
    };
  }
  return {
    res: true,
  };
};
