import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';

const PostCard = memo(({ card }) => {
  const isLogin = useSelector(state => state.user.is_login);
  const param = useParams();
  const isDetail = param.postId ? true : false;
  const {
    boardId,
    creater,
    content,
    imageUrl,
    grid,
    likeCount,
    createdAt,
    likes,
  } = card;

  const navigate = useNavigate();

  const goToDetail = e => {
    !isDetail && isLogin && navigate(`/post/${boardId}`);
  };

  return (
    <CardBox onClick={goToDetail} className={isDetail ? 'detail' : 'main'}>
      <StyleBox>
        <PostCardHeader creater={creater} date={createdAt} />
        <PostCardContent grid={grid} content={content} image={imageUrl} />
        <PostCardFooter
          card={card}
          likeCount={likeCount}
          likes={likes}
          boardId={boardId}
        />
      </StyleBox>
    </CardBox>
  );
});

const CardBox = styled.li`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;

  // @media screen and (max-width: 50rem) {
  //   flex-direction: row;
  //   flex-wrap: wrap;
  //   width: 50%;
  // }
  @media screen and (max-width: 40rem) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  &.detail {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const StyleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0.3em;
  padding: 1em;
  width: calc(100%-0.6em);
  border: 2px solid lightgrey;
  border-radius: 8px;
  // background-color: lightblue;
`;

export default PostCard;
