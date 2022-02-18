import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';

const PostCard = ({ card }) => {
  const { id, title, nickName, content, likeCount, createdAt, modifiedAt } =
    card;
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <CardBox onClick={goToEdit}>
      <PostCardHeader nickName={nickName} date={createdAt} />
      <PostCardContent title={title} content={content} />
      <PostCardFooter like={likeCount} />
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
