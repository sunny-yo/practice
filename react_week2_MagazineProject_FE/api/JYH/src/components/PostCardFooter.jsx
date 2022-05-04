import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postLikeAxios, postLikeCancelAxios } from '../redux/modules/post';
import { setOnePostLike } from '../redux/modules/postdetail';
import { useNavigate } from 'react-router-dom';

const PostCardFooter = ({ likeCount, likes, boardId }) => {
  const isLogin = useSelector(state => state.user.is_login);
  const userid = useSelector(state => state.user.user_info.userid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onLike, setOnLike] = useState(false);

  // 로그인한 유저가 게시글을 좋아요한 리스트에 있으면 onLike=true
  useEffect(() => {
    if (
      likes.length > 0 &&
      likes.filter(user => user.userId === parseInt(userid)).length >= 1
    ) {
      setOnLike(true);
    }
  }, [userid]);

  const handleLike = e => {
    if (!isLogin) {
      alert('로그인이 필요합니다');
      e.stopPropagation();
      return;
    }
    if (e.currentTarget.id === 'like-button' && !onLike) {
      e.currentTarget.classList.toggle('like');
      e.stopPropagation();
      setOnLike(true);
      const newLike = likes.concat([{ userId: userid }]);
      const updatedCount = parseInt(likeCount) + 1;
      dispatch(setOnePostLike({ newLike, updatedCount }));
      dispatch(
        postLikeAxios({ userid, boardId, newLike, updatedCount, navigate })
      );
    } else if (e.currentTarget.id === 'like-button' && onLike) {
      e.currentTarget.classList.toggle('like');
      e.stopPropagation();
      setOnLike(false);
      const newLike = likes.filter(user => {
        return user.userId !== parseInt(userid);
      });
      const updatedCount = parseInt(likeCount) - 1;
      dispatch(setOnePostLike({ newLike, updatedCount }));
      dispatch(
        postLikeCancelAxios({
          userid,
          boardId,
          newLike,
          updatedCount,
          navigate,
        })
      );
    }
  };

  return (
    <FooterBox>
      <span>좋아요 {likeCount}개</span>
      <Like id='like-button' onClick={handleLike} className={onLike && 'like'}>
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
