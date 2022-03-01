import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostAxios } from '../redux/modules/post';
import InfinityScroll from '../components/InfinityScroll';

const Main = ({ isLogin }) => {
  const { data, is_loading, paging } = useSelector(state => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addPost = () => {
    if (!isLogin) {
      alert('로그인 후 작성해주세요');
      navigate('/login');
      return;
    }
    navigate('/post');
  };

  return (
    <InfinityScroll
      callNext={() => {
        dispatch(getPostAxios());
      }}
      is_next={paging.load ? true : false}
      loading={is_loading}
    >
      <ListBox>
        {data.map(card => (
          <PostCard key={card.boardId} card={card} />
        ))}
        <AddButton onClick={addPost}>
          <FaPlusCircle />
        </AddButton>
      </ListBox>
    </InfinityScroll>
  );
};

const ListBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  font-size: 2rem;
`;

export default Main;
