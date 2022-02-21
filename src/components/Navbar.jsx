import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logoutFB } from '../redux/modules/user';

const Navbar = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const _logout = () => {
    dispatch(logoutFB());
    navigate('/', { replace: true });
  };

  if (isLogin) {
    return (
      <Header>
        <LogoImg onClick={goToMain} src="/img/logo.png" alt="logo" />
        <div className="buttons">
          <Button onClick={_logout}>로그아웃</Button>
        </div>
      </Header>
    );
  }

  return (
    <Header>
      <LogoImg onClick={goToMain} src="/img/logo.png" alt="logo" />
      <div className="buttons">
        <Button onClick={goToLogin}>로그인</Button>
        <Button onClick={goToRegister}>회원가입</Button>
      </div>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  padding: 2em 0;
  display: flex;
  justify-content: space-between;
  background-color: lightgrey;
`;

const LogoImg = styled.img`
  display: inline-block;
  width: 2rem;
  height: 2rem;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.3em 0.5em;
  margin-left: 0.5em;
  border-radius: 4px;
`;

export default Navbar;
