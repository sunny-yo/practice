import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContent = ({ grid, content, image }) => {
  const imgTargetRef = useRef();
  const param = useParams();

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        imgTargetRef.current.src = imgTargetRef.current.dataset.src;
      }
    });
    observer.observe(imgTargetRef.current);
  }, []);

  return (
    <ContentBox grid={grid}>
      <ContentText>{content}</ContentText>
      <ContentImg
        ref={imgTargetRef}
        src={param.postId ? image : ''}
        data-src={image}
        alt='image'
        // loading='lazy'
      />
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
    props.grid === 'column'
      ? 'margin: 0 auto; width: 10rem;'
      : 'width: 10rem;'};
  height: ${props => (props.grid === 'column' ? '10rem' : '8rem')};
`;

export default PostCardContent;
