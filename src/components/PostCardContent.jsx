import React from 'react';
import styled from 'styled-components';

const PostCardContent = ({ grid, content, image }) => {
  return (
    <ContentBox grid={grid}>
      <ContentText>{content}</ContentText>
      <ContentImg src={image} alt='image' />
    </ContentBox>
  );
};

const ContentBox = styled.div`
  margin: 0.7em 0;
  display: flex;
  flex-direction: ${props => props.grid};
`;

const ContentText = styled.p`
  padding: ${props => (props.grid === 'column' ? '1em 0' : '0')};
`;

const ContentImg = styled.img`
  display: block;
  ${props => (props.grid === 'column' ? 'margin: 0 auto;' : 'width: 80%;')}
`;

export default PostCardContent;
