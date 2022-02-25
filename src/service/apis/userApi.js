import axios from 'axios';

class UserApi {
  constructor() {
    this.base = 'http://localhost:3000'; // 서버 ip 주소로 바꾸기
  }

  async signUp({ registerData, navigate }) {
    const sighupConfig = {
      // method: 'post',
      method: 'get',
      // url: `${this.base}/api/register`,
      url: `${this.base}/api/register.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(registerData),
    };

    return axios(sighupConfig)
      .then(res => {
        console.log(res);
        alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
        navigate('/login', { replace: true });
        return res.data;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      });
  }

  async signIn({ loginData, navigate }) {
    const signinConfig = {
      // method: 'post',
      method: 'get',
      // url: `${this.base}/api/login`,
      url: `${this.base}/api/login.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(loginData),
    };

    return axios(signinConfig)
      .then(res => {
        console.log(res);
        alert('로그인에 성공했습니다. 메인 페이지로 이동합니다.');
        navigate('/', { replace: true });
        return res.data;
      })
      .catch(err => {
        alert('로그인에 실패했습니다');
        console.log(err);
        console.log(err.messages);
      });
  }

  async signOut({ navigate }) {
    const signoutConfig = {
      // method: 'post',
      method: 'get',
      // url: `${this.base}/api/logout`,
      url: `${this.base}/api/logout.json`,
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    };

    return axios(signoutConfig)
      .then(res => {
        console.log(res);
        alert('로그아웃에 성공하셨습니다');
        navigate('/', { replace: true });
        return true;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
        alert('다시 시도해주세요');
        return false;
      });
  }
}

export default UserApi;
