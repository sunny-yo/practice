import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import LabelInput from '../components/LabelInput';

const RegisterForm = (props) => {
  return (
    <Form>
      <LabelInput name={'아이디'} placeholder={'아이디를 입력하세요'} />
      <LabelInput name={'닉네임'} placeholder={'닉네임을 입력하세요'} />
      <LabelInput name={'비밀번호'} placeholder={'비밀번호를 입력하세요'} />
      <LabelInput
        name={'비밀번호 확인'}
        placeholder={'비밀번호를 다시 입력하세요'}
      />
      <Button name={'회원가입하기'} />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default RegisterForm;
