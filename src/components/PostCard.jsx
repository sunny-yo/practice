import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';

const PostCard = ({ card }) => {
  const isLogin = useSelector(state => state.user.is_login);
  const param = useParams();
  const {
    boardId,
    creater,
    content,
    imageurl,
    grid,
    likeCount,
    createdAt,
    likes,
  } = card;

  const navigate = useNavigate();

  const goToDetail = e => {
    !param.postId && isLogin && navigate(`/post/${boardId}`, { state: card });
  };

  return (
    <CardBox onClick={goToDetail}>
      <PostCardHeader creater={creater} date={createdAt} />
      <PostCardContent grid={grid} content={content} image={imageurl} />
      <PostCardFooter
        card={card}
        likeCount={likeCount}
        likes={likes}
        boardId={boardId}
      />
    </CardBox>
  );
};

const CardBox = styled.li`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  padding: 1em;
  margin: 0.5em 0;
`;

export default PostCard;
