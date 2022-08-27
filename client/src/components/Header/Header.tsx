import React, { memo } from 'react';

import MainMenu from 'components/MainMenu/MainMenu';
import UserPopUp from 'components/UserPopUp/UserPopUp';

import styles from './Header.module.scss';

const Header = memo(() => (
  <div className={styles.wrapper}>
    <MainMenu />
    <UserPopUp />
  </div>
));

Header.displayName = 'Header';

export default Header;
