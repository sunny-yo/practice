import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const navigate = useNavigate();

  const goToCalendar = (userId) => {
    navigate('/calendar', { state: { id: userId } });
  };

  const onLogin = (e) => {
    const providerName = e.currentTarget.textContent;
    authService //
      .login(providerName)
      .then((data) => goToCalendar(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToCalendar(user.uid);
    });
  });

  return (
    <section className={styles.container}>
      <Header authService={authService} />
      <section className={styles.login}>
        <h1>Login</h1>
        <ul>
          <li>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li>
            <button className={styles.button}>Github</button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
