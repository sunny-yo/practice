import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setGrid } from '../redux/modules/grid';

const GridButton = ({ grid }) => {
  const dispatch = useDispatch();

  const handleGrid = e => {
    dispatch(setGrid(e.target.id));
  };

  return (
    <ButtonBox grid={grid} onClick={handleGrid}>
      <Img id='column' src='/img/grid_1.png' alt='' />
      <Img id='row-reverse' src='/img/grid_2.png' alt='' />
      <Img id='row' src='/img/grid_3.png' alt='' />
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  & button {
    border-radius: 8px;
  }
  & #${props => props.grid} {
    background-color: blue;
  }
`;

const Img = styled.img`
  display: inline-block;
  width: 3rem;
  height: 3rem;
`;

export default GridButton;
