import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddForm from '../components/AddForm';

const AddPost = (props) => {
  const location = useLocation();
  console.log(location);
  return (
    <AddPostBox>
      <Header>단어 추가하기</Header>
      <AddForm post={location} />
    </AddPostBox>
  );
};

const AddPostBox = styled.div`
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

export default AddPost;
