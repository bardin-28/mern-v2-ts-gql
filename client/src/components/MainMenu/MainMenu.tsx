import React, { memo, useRef, useState } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { GridIco } from 'assets/images/svg/grid';
import { ROUTES } from 'constants/constants';
import useOutsideClick from 'hooks/useOutsideClick';

import styles from './MainMenu.module.scss';

const pages = [
  { label: 'Home', link: ROUTES.DASHBOARD },
  { label: 'Create link', link: ROUTES.CREATE },
];

const MainMenu = memo(() => {
  const popUpRef: any = useRef();
  const [active, setActive] = useState(false);

  const closeHandler = () => {
    setActive(false);
  };

  useOutsideClick(popUpRef, closeHandler);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.trigger, { [styles.active]: active })}
        onClick={() => setActive(!active)}>
        <GridIco />
      </div>
      <div
        ref={popUpRef}
        className={cn(styles['pop-up'], { [styles.active]: active })}>
        <nav className={styles['nav-list']}>
          {pages.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              onClick={() => setActive(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
});

MainMenu.displayName = 'MainMenu';

export default MainMenu;
