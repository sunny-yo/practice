import React from 'react';
import styles from './header.module.css';

const Header = ({ totalCount }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>Todo List</h1>
    <span className={styles.count}>{totalCount}</span>
  </header>
);

export default Header;
