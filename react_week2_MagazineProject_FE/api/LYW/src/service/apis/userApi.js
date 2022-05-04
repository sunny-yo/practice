import axios from 'axios';

class UserApi {
  constructor() {
    // this.base = 'http://localhost:3000'; // 서버 ip 주소로 바꾸기
    this.base = process.env.REACT_APP_BE_IP_LYW;
  }

  async signUp({ registerData, navigate }) {
    const sighupConfig = {
      method: 'post',
      url: `${this.base}/api/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(registerData),
    };

    return axios(sighupConfig)
      .then(res => {
        console.log(res);
        alert(res.data.msg);
        // alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
        navigate('/login', { replace: true });
        return res.data;
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }

  async signIn({ loginData, navigate }) {
    const signinConfig = {
      method: 'post',
      url: `${this.base}/api/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(loginData),
    };

    return axios(signinConfig)
      .then(res => {
        console.log(res);
        alert(res.data.msg);
        // alert('로그인에 성공했습니다. 메인 페이지로 이동합니다.');
        navigate('/', { replace: true });
        return res.data;
      })
      .catch(err => {
        alert(err.response.data.msg);
        console.log(err);
        console.log(err.response);
      });
  }

  async signOut({ navigate }) {
    const signoutConfig = {
      method: 'post',
      url: `${this.base}/api/logout`,
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
        console.log(err.response);
        alert(err.response.data.msg);
        return false;
      });
  }
}

export default UserApi;
