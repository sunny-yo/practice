import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deletePostFB } from '../redux/modules/post';

const Detail = props => {
  const cards = useSelector(state => state.post.data);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.user_info.username);

  // 원래는 param.postId=boardId 여서
  // 상세페이지 조회 api 보내고
  // 데이터 받아서 PostCard 에 넣기
  const thisCard = cards.filter(card => card.boardId === param.postId)[0];

  const goToEdit = () => {
    navigate(`/edit/${param.postId}`, { state: thisCard });
  };

  const handleDelete = () => {
    dispatch(deletePostFB(param.postId));
    navigate('/', { replace: true });
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
