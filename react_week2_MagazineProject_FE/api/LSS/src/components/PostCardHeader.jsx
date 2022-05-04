import React from 'react';
import styled from 'styled-components';

const PostCardHeader = ({ creater, date }) => {
  return (
    <HeaderBox>
      <span className="creater">{creater}</span>
      <span className="date">{date}</span>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  & .creater {
    font-weight: bold;
  }
  & .date {
    font-size: 0.7rem;
  }
`;

export default PostCardHeader;
