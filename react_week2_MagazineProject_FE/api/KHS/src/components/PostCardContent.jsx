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
  margin: 0.7em;
  display: flex;
  flex-direction: ${props => props.grid};
  hieght: 100%;
`;

const ContentText = styled.div`
  display: block;
  ${props => (props.grid === 'column' ? 'width: 100%;' : 'width: 50%;')};
`;

const ContentImg = styled.img`
  display: block;
  ${props =>
    props.grid === 'column' ? 'margin: 0 auto; width: 100%;' : 'width: 50%;'};
`;

export default PostCardContent;
