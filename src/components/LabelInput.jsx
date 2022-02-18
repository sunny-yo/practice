import React from 'react';
import styled from 'styled-components';

const LabelInput = ({ name, placeholder }) => {
  return (
    <Box>
      <Label htmlFor={name}>{name}</Label>
      <Input type="text" placeholder={placeholder} />
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.3em 0.1em;
`;

export default LabelInput;
