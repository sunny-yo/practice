import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const PostList = (props) => {
  const navigate = useNavigate();
  const postlist = useSelector((state) => state.words.postlist);

  const goToAddPost = () => {
    navigate('create');
  };
  return (
    <PostListBox>
      <Header>MY DICTIONARY</Header>
      <ListBox>
        {postlist.map((item, index) => (
          <PostCard key={index} post={item} />
        ))}
      </ListBox>
      <AddBtn onClick={goToAddPost}>
        <FaPlus />
      </AddBtn>
    </PostListBox>
  );
};

const PostListBox = styled.div`
  width: 80vw;
  min-width: 300px;
  height: 80vh;
  background-color: lightgrey;
  padding: 2em;
  position: relative;
`;

const Header = styled.header`
  margin-bottom: 1em;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ListBox = styled.section`
  max-height: 68vh;
  overflow: auto;
`;

const AddBtn = styled.button`
  position: absolute;
  top: 1.5em;
  right: 2em;
  font-size: 1.5rem;
  line-height: 1.3rem;
  background-color: darkgrey;
  padding: 0.2em 0.3em;
  border-radius: 50%;
`;

export default PostList;
