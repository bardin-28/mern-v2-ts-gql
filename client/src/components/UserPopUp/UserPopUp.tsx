import React, { useRef, useState } from 'react';

import { useQuery } from '@apollo/client';
import cn from 'classnames';

import GET_CURRENT_USER from '../Header/queries/getCurrentUser.graphql';

import { useGlobalState } from 'app/store';
import { STORE_ACTIONS } from 'app/store/constants';
import { ChevronIco } from 'assets/images/svg/chevron';
import { UserIco } from 'assets/images/svg/user';
import CustomButton from 'components/CustomButton';
import useOutsideClick from 'hooks/useOutsideClick';

import styles from './UserPopUp.module.scss';

const UserPopUp = () => {
  const { loading, error, data: userData } = useQuery(GET_CURRENT_USER);

  const [active, setActive] = useState(false);
  const [store, dispatch] = useGlobalState();
  const popUpRef: any = useRef();

  const logoutHandler = () => {
    dispatch({ type: STORE_ACTIONS.USER_LOGOUT });
    localStorage.removeItem('token');
  };

  const closeHandler = () => {
    setActive(false);
  };

  useOutsideClick(popUpRef, closeHandler);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.trigger, { [styles.active]: active })}
        onClick={() => setActive(!active)}>
        {userData?.getCurrentUser?.first_name}{' '}
        {userData?.getCurrentUser?.last_name}
        <span>
          <ChevronIco />
        </span>
      </div>
      <div
        ref={popUpRef}
        className={cn(styles['pop-up'], { [styles.active]: active })}>
        <div className={styles.avatar}>
          <span>
            <UserIco />
          </span>
        </div>
        <div className={styles.email}>{userData?.getCurrentUser?.email}</div>
        <CustomButton
          className={styles.button}
          onClick={logoutHandler}
          text={'Sign out'}
          type={'button'}
        />
      </div>
    </div>
  );
};

export default UserPopUp;
