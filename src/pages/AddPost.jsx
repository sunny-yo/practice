import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

// layout 3개
// 1. 이미지 / 텍스트
// 2. 텍스트 / 이미지
// 3. 텍스트
//    이미지

const AddPost = (props) => {
  const param = useParams();
  // console.log(param);
  const contentRef = useRef();
  const navigate = useNavigate();

  const addPost = (e) => {
    e.preventDefault();
    console.log(contentRef.current.value);

    if (contentRef.current.value === '') {
      alert('게시글을 작성해주세요');
      return;
    }

    navigate('/');
  };

  if (param?.postId) {
    // 상세게시글 조회 API
    return <>edit</>;
  }

  return (
    <PostForm onSubmit={addPost}>
      <textarea
        ref={contentRef}
        name="content"
        cols="30"
        rows="10"
        placeholder="게시글 작성"
        autoFocus
      ></textarea>
      <div>이미지추가</div>
      <Button name={'게시글 작성'} />
    </PostForm>
  );
};

const PostForm = styled.form`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default AddPost;
