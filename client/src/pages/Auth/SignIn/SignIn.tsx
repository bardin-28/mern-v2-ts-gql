import React, { memo } from 'react';

import SignInForm from 'forms/SignIn/SignIn';

import styles from './SignIn.module.scss';

const SignIn = memo(() => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Welcome back</h1>
    <SignInForm />
  </div>
));

SignIn.displayName = 'SignIn';

export default SignIn;
