import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  deletePostAxios,
  deletePostFB,
  getOnePostAxios,
} from '../redux/modules/post';

const Detail = props => {
  const thisCard = useSelector(state => state.postdetail.post);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.user_info.username);

  useEffect(() => {
    dispatch(getOnePostAxios(param.postId));
  }, []);

  const goToEdit = () => {
    navigate(`/edit/${thisCard.boardId}`, { state: thisCard });
  };

  const handleDelete = () => {
    dispatch(
      deletePostAxios({ username, boardId: thisCard.boardId, navigate })
    );
  };

  return (
    <>
      <PostCard card={thisCard} />
      {username === thisCard.creater && (
        <PostButtons>
          <button onClick={goToEdit}>
            <FaEdit />
          </button>
          <button onClick={handleDelete}>
            <FaTrash />
          </button>
        </PostButtons>
      )}
    </>
  );
};

const PostButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    font-size: 1.3rem;
    margin-left: 0.5em;
  }
`;

export default Detail;
