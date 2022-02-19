import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaPlusCircle } from 'react-icons/fa';
import { resp } from '../shared/response';
import { useNavigate } from 'react-router-dom';

const Main = (props) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCards(resp);
  });

  const goToAddPost = () => {
    navigate('/post');
  };

  return (
    <ul>
      {cards.map((card) => (
        <PostCard key={card.id} card={card} />
      ))}
      <AddButton onClick={goToAddPost}>
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
