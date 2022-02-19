import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';

const Register = (props) => {
  return (
    <>
      <Title>회원가입</Title>
      <RegisterForm />
    </>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1em 0;
`;

export default Register;
