import React from 'react';
import styled from 'styled-components';

const PostCardPiece = (props) => {
  const { title, content, color } = props;
  return (
    <PieceBox>
      <Label htmlFor={title}>{title}</Label>
      <Content color={color}>{content}</Content>
    </PieceBox>
  );
};

PostCardPiece.defaultProps = {
  title: 'title',
  content: 'content',
  color: 'black',
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
  color: ${(props) => props.color};
`;

export default PostCardPiece;
