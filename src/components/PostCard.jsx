import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';

const PostCard = ({ card }) => {
  const {
    boardId,
    creater,
    content,
    imageurl,
    grid,
    likeCount,
    createdAt,
    likes,
  } = card;

  const navigate = useNavigate();

  const goToEdit = (e) => {
    navigate(`/edit/${boardId}`);
  };

  return (
    <CardBox onClick={goToEdit}>
      <PostCardHeader creater={creater} date={createdAt} />
      <PostCardContent grid={grid} content={content} />
      <PostCardFooter like={likeCount} likes={likes} boardId={boardId} />
    </CardBox>
  );
};

const CardBox = styled.li`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  padding: 1em;
  margin: 0.5em 0;
`;

export default PostCard;
