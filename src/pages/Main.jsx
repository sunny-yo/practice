import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Main = ({ isLogin }) => {
  const cards = useSelector((state) => state.post.data);
  const navigate = useNavigate();

  const addPost = () => {
    if (!isLogin) {
      alert('로그인 후 작성해주세요');
      navigate('/login');
      return;
    }
    navigate('/post');
  };

  return (
    <ul>
      {cards.map((card) => (
        <PostCard key={card.boardId} card={card} />
      ))}
      <AddButton onClick={addPost}>
        <FaPlusCircle />
      </AddButton>
    </ul>
  );
};

const AddButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  font-size: 2rem;
`;

export default Main;
