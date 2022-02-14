import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddPost = (props) => {
  const navigate = useNavigate();

  const goToPostList = () => {
    navigate('/');
  };

  return (
    <>
      <header>단어 추가하기</header>
      <div>form</div>
      <button onClick={goToPostList}>추가하기</button>
    </>
  );
};

export default AddPost;
