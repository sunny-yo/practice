import React from 'react';
import styled from 'styled-components';

const PostCardPiece = (props) => {
  const { title, content } = props;
  return (
    <>
      <Label htmlFor={title}>{title}</Label>
      <Content>{content}</Content>
    </>
  );
};

PostCardPiece.defaultProps = {
  title: 'title',
  content: 'content',
};

const Label = styled.label`
  font-size: 0.7rem;
  text-decoration: underline;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export default PostCardPiece;
