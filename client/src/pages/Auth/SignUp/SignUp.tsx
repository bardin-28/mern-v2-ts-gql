import React, { memo } from 'react';

import SignUpForm from 'forms/SignUp/SignUp';

import styles from './SignUp.module.scss';

const SignUp = memo(() => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Welcome</h1>
    <SignUpForm />
  </div>
));

SignUp.displayName = 'SignUp';

export default SignUp;
