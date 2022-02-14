import React from 'react';
import styled from 'styled-components';
import PostCardPiece from './PostCardPiece';

const PostCard = ({ post }) => {
  const { word, desc, ex } = post;
  return (
    <PostCardBox>
      <PostCardPiece title={'단어'} content={word} />
      <PostCardPiece title={'설명'} content={desc} />
      <PostCardPiece title={'예시'} content={ex} />
    </PostCardBox>
  );
};

const PostCardBox = styled.article`
  background-color: white;
  margin: 0.5em 0;
  padding: 0.7em;
  border-radius: 8px;
`;

export default PostCard;
