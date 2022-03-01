import axios from 'axios';
import { setOnePost } from '../../redux/modules/postdetail';
import { logoutAxios } from '../../redux/modules/user';

class PostApi {
  constructor() {
    this.base = process.env.REACT_APP_BE_IP_LYW;
  }

  getToken = () => sessionStorage.getItem('token');

  async getPosts({ page, size, sortBy }) {
    const getpostConfig = {
      method: 'get',
      url: `${this.base}/api/board?page=${page}&size=${size}&sortBy=${sortBy}`,
      headers: {},
    };

    return axios(getpostConfig)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async addPost({ postData, navigate }) {
    const addpostConfig = {
      method: 'post',
      url: `${this.base}/api/board`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.getToken(),
      },
      data: JSON.stringify(postData),
    };

    return axios(addpostConfig)
      .then(res => {
        console.log(res);
        alert('게시글 등록이 완료되었습니다.');
        navigate(`/post/${res.data.boardId}`, { replace: true });
        return res.data;
      })
      .catch(err => {
        alert('게시글 등록이 완료되지 않았습니다. 다시 시도해보세요.');
        console.log(err.response);
      });
  }

  async deletePost({ username, boardId, navigate }) {
    const deletepostConfig = {
      method: 'delete',
      url: `${this.base}/api/board/${boardId}`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.getToken(),
      },
      data: JSON.stringify({ username: username }),
    };

    return axios(deletepostConfig)
      .then(res => {
        console.log(res);
        alert('해당 게시글이 삭제되었습니다');
        navigate('/', { replace: true });
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async editPost({ boardId, postData, navigate }) {
    const editpostConfig = {
      method: 'put',
      url: `${this.base}/api/board/${boardId}`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.getToken(),
      },
      data: JSON.stringify(postData),
    };

    return axios(editpostConfig)
      .then(res => {
        console.log(res);
        alert('게시글 수정이 완료되었습니다.');
        navigate(`/post/${boardId}`);
        return true;
      })
      .catch(err => {
        alert('게시글 수정이 완료되지 않았습니다. 다시 시도해주세요.');
        console.log(err.response);
        return false;
      });
  }

  async getOnePost({ boardId, dispatch }) {
    const getonepostConfig = {
      method: 'get',
      url: `${this.base}/api/board/${boardId}`,
      headers: { 'X-AUTH-TOKEN': this.getToken() },
    };

    return axios(getonepostConfig)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async postLike({ userid, boardId, navigate, dispatch }) {
    const postlikeConfig = {
      method: 'post',
      url: `${this.base}/api/board/${boardId}/like`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.getToken(),
      },
      data: JSON.stringify({ userId: userid }),
    };
    console.log(postlikeConfig.data);

    return axios(postlikeConfig)
      .then(res => {
        console.log(res);
        alert('좋아요 성공');
        return true;
      })
      .catch(err => {
        alert('좋아요 실패');
        console.log(err.response);
        if (err.response.data.status === 403) {
          alert('로그인 시간이 만료되었어요. 다시 로그인해주세요.');
          dispatch(logoutAxios({ navigate }));
        }
        return false;
      });
  }

  async postLikeCancel({ userid, boardId, navigate, dispatch }) {
    const postlikecancelConfig = {
      method: 'delete',
      url: `${this.base}/api/board/${boardId}/like`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.getToken(),
      },
      data: JSON.stringify({ userId: userid }),
    };

    return axios(postlikecancelConfig)
      .then(res => {
        alert('좋아요 취소 성공');
        console.log(res);
        return true;
      })
      .catch(err => {
        alert('좋아요 취소 실패');
        console.log(err.response);
        if (err.response.data.status === 403) {
          alert('로그인 시간이 만료되었어요. 다시 로그인해주세요.');
          dispatch(logoutAxios({ navigate }));
          navigate('/', { replace: true });
        }
        return false;
      });
  }
}

export default PostApi;
