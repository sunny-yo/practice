import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const PostCardFooter = (props) => {
  return (
    <FooterBox>
      <Like>
      <span>좋아요 {like}개</span>
        <FaHeart />
      </Like>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 1em;
`;

const Like = styled.span`
  color: grey;
  cursor: pointer;
  transition: all 120ms ease-in;
  &:hover {
    color: pink;
  }
`;

export default PostCardFooter;
