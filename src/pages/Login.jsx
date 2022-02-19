import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const Login = (props) => {
  return (
    <>
      <Title>로그인</Title>
      <LoginForm />
    </>
  );
};

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1em 0;
`;

export default Login;
