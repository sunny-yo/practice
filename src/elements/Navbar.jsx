import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = (props) => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const logout = () => {
    goToMain();
  };

  return (
    <Header>
      <LogoImg onClick={goToMain} src="/img/logo.png" alt="logo" />
      <div className="buttons">
        <Button onClick={goToLogin}>로그인</Button>
        <Button onClick={goToRegister}>회원가입</Button>
        {/* <Button onClick={logout}>로그아웃</Button> */}
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
