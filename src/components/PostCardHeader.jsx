import React from 'react';
import styled from 'styled-components';

const PostCardHeader = ({ nickName, date }) => {
  return (
    <HeaderBox>
      <SpanBold>{nickName}</SpanBold>
      <span>{date}</span>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const SpanBold = styled.span`
  font-weight: bold;
`;

export default PostCardHeader;
