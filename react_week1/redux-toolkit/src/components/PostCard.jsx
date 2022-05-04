import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostCardPiece from './PostCardPiece';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { remove } from '../redux/modules/wordsSlice';
import { removeWordFB } from '../redux/modules/wordsSliceFB';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, word, desc, ex } = post;

  const editCard = () => {
    navigate(`/update/${post.id}`, { state: post });
  };

  const deleteCard = () => {
    dispatch(removeWordFB(id));
  };

  return (
    <PostCardBox>
      <PostCardPiece title={'단어'} content={word} />
      <PostCardPiece title={'설명'} content={desc} />
      <PostCardPiece title={'예시'} content={ex} color={'#039be5'} />
      <ButtonBox>
        <button onClick={editCard}>
          <FaEdit />
        </button>
        <button onClick={deleteCard}>
          <FaTrash />
        </button>
      </ButtonBox>
    </PostCardBox>
  );
};

const PostCardBox = styled.article`
  background-color: white;
  margin: 0.5em 0;
  padding: 0.7em;
  border-radius: 8px;
  position: relative;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  & button {
    font-size: 1.2rem;
    margin-left: 0.5em;
  }
  & button:hover {
    opacity: 0.5;
    transform: scale(1.1);
  }
`;

export default PostCard;
