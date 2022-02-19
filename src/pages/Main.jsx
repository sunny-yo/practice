import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaPlusCircle } from 'react-icons/fa';
import { resp } from '../shared/response';
import { useNavigate } from 'react-router-dom';

const Main = ({ isLogin }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCards(resp);
  });

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
        <PostCard key={card.id} card={card} />
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
