import React from 'react';
import styles from './header.module.css';

const Header = ({ onLogout }) => {
  return (
    <header>
      <h1>My Calendar</h1>
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          logout
        </button>
      )}
    </header>
  );
};

export default Header;
