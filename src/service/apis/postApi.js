import axios from 'axios';
import { setOnePost } from '../../redux/modules/postdetail';

class PostApi {
  constructor() {
    this.base = 'http://localhost:3000';
  }

  async getPosts() {
    const getpostConfig = {
      method: 'get',
      // url: `${this.base}/api/board`,
      url: `${this.base}/api/board.json`,
      headers: {},
    };

    return axios(getpostConfig)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
      });
  }

  async addPost(postData) {
    const addpostConfig = {
      // method: 'post',
      method: 'get',
      // url: `${this.base}/api/board`,
      url: `${this.base}/api/boardplus.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(postData),
    };

    return axios(addpostConfig)
      .then(res => {
        console.log(res);
        alert('게시글 등록이 완료되었습니다.');
        return res.data;
      })
      .catch(err => {
        alert('게시글 등록이 완료되지 않았습니다. 다시 시도해보세요.');
        console.log(err);
        console.log(err.messages);
      });
  }

  async deletePost({ username, boardId, navigate }) {
    const deletepostConfig = {
      // method: 'delete',
      method: 'get',
      // url: `${this.base}/api/board/${boardId}`,
      url: `${this.base}/api/boarddelete.json`,
      headers: {
        'Content-Type': 'application/json',
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
        console.log(err);
        console.log(err.messages);
      });
  }

  async editPost({ boardId, postData, navigate }) {
    const editpostConfig = {
      // method: 'put',
      method: 'get',
      // url: `${this.base}/api/board/${boardId}`,
      url: `${this.base}/api/boardedit.json`,
      headers: {
        'Content-Type': 'application/json',
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
        console.log(err);
        console.log(err.messages);
        return false;
      });
  }

  async getOnePost({ boardId, dispatch }) {
    const getonepostConfig = {
      method: 'get',
      // url: `${this.base}/api/board/${boardId}`,
      url: `${this.base}/api/board/${boardId}.json`,
      headers: {},
    };

    return axios(getonepostConfig)
      .then(res => {
        console.log(res.data.data);
        dispatch(setOnePost(res.data.data));
        return res.data;
      })
      .catch(err => {
        // 다시 불러오기..? 아니면 에러페이지로 이동..?
        console.log(err);
        console.log(err.messages);
      });
  }

  async postLike({ userid, boardId }) {
    const postlikeConfig = {
      // method: 'post',
      method: 'get',
      // url: `${this.base}/api/board/${boardId}/like`,
      url: `${this.base}/api/board/${boardId}/like.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ userid: userid }),
    };

    return axios(postlikeConfig)
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
        return false;
      });
  }

  async postLikeCancel({ userid, boardId }) {
    const postlikecancelConfig = {
      // method: 'delete',
      method: 'get',
      // url: `${this.base}/api/board/${boardId}/like`,
      url: `${this.base}/api/board/${boardId}/like.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ userid: userid }),
    };

    return axios(postlikecancelConfig)
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
        return false;
      });
  }
}

export default PostApi;
