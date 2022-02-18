import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import LabelInput from '../components/LabelInput';

const LoginForm = (props) => {
  return (
    <Form>
      <LabelInput name={'아이디'} placeholder={'아이디를 입력하세요'} />
      <LabelInput name={'비밀번호'} placeholder={'비밀번호를 입력하세요'} />
      <Button name={'로그인하기'} />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default LoginForm;
