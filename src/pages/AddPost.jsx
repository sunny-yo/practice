import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';
import GridButton from '../components/GridButton';
import Button from '../elements/Button';
import { addPostAxios, updatePostAxios } from '../redux/modules/post';
import { setPreview } from '../redux/modules/image';
import { resetGrid, setGrid } from '../redux/modules/grid';

const AddPost = () => {
  const preview = useSelector(state => state.image.preview);
  const userInfo = useSelector(state => state.user.user_info);
  const gridStyle = useSelector(state => state.grid.grid);
  const location = useLocation();
  const param = useParams();
  const isEdit = param.postId ? true : false;
  const contentRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      dispatch(setGrid(location.state.grid));
      dispatch(setPreview(location.state.imageUrl));
      contentRef.current.value = location.state.content;
    }
  }, []);

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
    if (content === '' || !preview) {
      alert('사진 첨부와 게시글을 작성해주세요');
      return;
    }

    const newPost = {
      username: userInfo.username,
      content: content,
      imageUrl: null,
      grid: gridStyle,
      // likeCount: '0', //
      // createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'), //
      // likes: [], //
    };

    // const editedPost = {
    //   // ...location.state, //
    //   username: userInfo.username,
    //   imageUrl: location.state.imageurl,
    //   content: content,
    //   grid: gridStyle,
    // };

    !isEdit
      ? dispatch(addPostAxios({ postData: newPost, navigate }))
      : dispatch(
          updatePostAxios({
            boardId: param.postId,
            postData: {
              username: userInfo.username,
              imageUrl: location.state.imageUrl,
              content: content,
              grid: gridStyle,
            },
            navigate,
          })
        );
    dispatch(setPreview(null));
    dispatch(resetGrid());
  };

  return (
    <>
      <GridButton grid={gridStyle} />
      <PostForm onSubmit={addNewPost}>
        <Img
          src={preview ? preview : 'http://via.placeholder.com/400x300'}
          alt=''
        />
        <TextBox
          ref={contentRef}
          name='content'
          cols='30'
          rows='10'
          placeholder='게시글 작성'
          autoFocus
        ></TextBox>
        <input ref={fileRef} onChange={selectPhoto} type='file' />
        <Button name={param.postId ? '게시글 수정' : '게시글 작성'} />
      </PostForm>
    </>
  );
};

const PostForm = styled.form`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  display: block;
  width: 50%;
  height: auto;
`;

const TextBox = styled.textarea`
  display: block;
  width: 100%;
`;

export default AddPost;
