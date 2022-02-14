import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostList = (props) => {
  const navigate = useNavigate();

  const goToAddPost = () => {
    navigate('create');
  };
  return (
    <>
      <header>MY DICTIONARY</header>
      <div>post card</div>
      <button onClick={goToAddPost}>추가하기</button>
    </>
  );
};

export default PostList;
