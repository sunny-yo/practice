import React from 'react';
import styled from 'styled-components';

const PostCardPiece = (props) => {
  const { title, content } = props;
  return (
    <PieceBox>
      <Label htmlFor={title}>{title}</Label>
      <Content>{content}</Content>
    </PieceBox>
  );
};

PostCardPiece.defaultProps = {
  title: 'title',
  content: 'content',
};

const PieceBox = styled.div`
  padding: 0.1em 0;
`;

const Label = styled.label`
  font-size: 0.7rem;
  text-decoration: underline;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export default PostCardPiece;
