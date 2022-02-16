import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { create, update } from '../redux/modules/wordsSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createWordFB, updateWordFB } from '../redux/modules/wordsSliceFB';

const AddForm = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wordRef = useRef();
  const descRef = useRef();
  const exRef = useRef();

  useEffect(() => {
    if (post.state) {
      wordRef.current.value = post.state.word;
      descRef.current.value = post.state.desc;
      exRef.current.value = post.state.ex;
    }
  }, []);

  const goToPostList = async (e) => {
    e.preventDefault();
    const word = wordRef.current.value;
    const desc = descRef.current.value;
    const ex = exRef.current.value;

    if (word === '' || desc === '' || ex === '') {
      alert('모든 입력은 필수입니다');
      return;
    }

    post.state
      ? dispatch(
          updateWordFB({ ...post.state, word: word, desc: desc, ex: ex })
        )
      : dispatch(
          createWordFB({
            word: word,
            desc: desc,
            ex: ex,
          })
        );

    navigate('/');
  };

  return (
    <form onSubmit={goToPostList}>
      <PieceBox>
        <Label htmlFor="단어">단어</Label>
        <Input ref={wordRef} type="text" />
      </PieceBox>
      <PieceBox>
        <Label htmlFor="설명">설명</Label>
        <Input ref={descRef} type="text" />
      </PieceBox>
      <PieceBox>
        <Label htmlFor="예시">예시</Label>
        <Input ref={exRef} type="text" />
      </PieceBox>
      <AddBtn>{post.state ? '수정하기' : '추가하기'}</AddBtn>
    </form>
  );
};

const PieceBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0.8em;
  margin: 0.5em 0;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 0.7rem;
  text-decoration: underline;
  margin-bottom: 0.5em;
`;

const Input = styled.input`
  font-size: 1.3rem;
  padding: 0.1em 0;
`;

const AddBtn = styled.button`
  width: 100%;
  padding: 0.5em;
  margin-top: 1em;
  background-color: darkgrey;
  border-radius: 8px;
  font-size: 1rem;
`;

export default AddForm;
