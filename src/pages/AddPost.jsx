import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import GridButton from '../components/GridButton';
import Button from '../elements/Button';
import { addPostFB } from '../redux/modules/post';
import { setPreview } from '../redux/modules/image';

const AddPost = () => {
  const preview = useSelector(state => state.image.preview);
  const userInfo = useSelector(state => state.user.user_info);
  console.log(userInfo);
  const gridStyle = useSelector(state => state.grid.grid);
  const contentRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectPhoto = e => {
    const fileReader = new FileReader();
    const file = fileRef.current.files[0];

    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      dispatch(setPreview(fileReader.result));
    };
  };

  const addNewPost = e => {
    e.preventDefault();

    const content = contentRef.current.value;
    if (content === '' && !preview) {
      alert('사진 첨부와 게시글을 작성해주세요');
      return;
    }

    const newPost = {
      creater: userInfo.username,
      content: content,
      imageurl: null,
      grid: gridStyle,
      likeCount: '0',
      createdAt: new Date().toDateString(),
      likes: [],
    };
    console.log(newPost);
    dispatch(addPostFB(newPost));
    dispatch(setPreview(null));

    navigate('/');
  };

  return (
    <>
      <GridButton grid={gridStyle} />
      <PostForm onSubmit={addNewPost}>
        <img
          src={preview ? preview : 'http://via.placeholder.com/400x300'}
          alt=''
        />
        <textarea
          ref={contentRef}
          name='content'
          cols='30'
          rows='10'
          placeholder='게시글 작성'
          autoFocus
        ></textarea>
        <input ref={fileRef} onChange={selectPhoto} type='file' />
        <Button name={'게시글 작성'} />
      </PostForm>
    </>
  );
};

const PostForm = styled.form`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default AddPost;
