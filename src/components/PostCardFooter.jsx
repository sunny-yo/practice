import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postLike, postLikeCancel } from '../redux/modules/post';

const PostCardFooter = ({ like, likes, boardId }) => {
  const isLogin = useSelector((state) => state.user.is_login);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [onLike, setOnLike] = useState(false);

  // 로그인한 유저가 게시글을 좋아요한 리스트에 있으면 onLike=true
  useEffect(() => {
    if (likes.filter((user) => user.userId === userId).length > 0) {
      setOnLike(true);
    }
  }, []);

  const handleLike = (e) => {
    if (!isLogin) {
      alert('로그인이 필요합니다');
      e.stopPropagation();
      return;
    }
    if (e.currentTarget.id === 'like-button' && !onLike) {
      e.currentTarget.classList.toggle('like');
      e.stopPropagation();
      setOnLike(true);
      dispatch(postLike({ boardId, userId }));
    } else if (e.currentTarget.id === 'like-button' && onLike) {
      e.currentTarget.classList.toggle('like');
      e.stopPropagation();
      setOnLike(false);
      dispatch(postLikeCancel({ boardId, userId }));
    }
  };

  return (
    <FooterBox>
      <span>좋아요 {like}개</span>
      <Like id="like-button" onClick={handleLike} className={onLike && 'like'}>
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
  &.like {
    color: pink;
  }
`;

export default PostCardFooter;
