import React, { memo, useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import SIGN_IN_USER from './queries/signInUser.graphql';

import { useGlobalState } from 'app/store';
import { STORE_ACTIONS } from 'app/store/constants';
import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';
import { ROUTES } from 'constants/constants';
import { signInValidation } from 'validations/validations';

import styles from './SignIn.module.scss';

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = memo(() => {
  const [signIn, { error, data: loginData }] = useMutation(SIGN_IN_USER);
  const [state, dispatch] = useGlobalState();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
    if (loginData) {
      successLoginHandler(loginData?.loginUser);
    }
    if (error) {
      if (error.message == 'Incorrect password') {
        setErrors({ email: '', password: 'Incorrect password' });
      }
    }
  }, [loginData, error]);

  const successLoginHandler = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: STORE_ACTIONS.USER_LOGIN });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign in</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidation}
        initialErrors={errors}
        enableReinitialize={true}
        onSubmit={({ email, password }) =>
          signIn({
            variables: { email, password },
          })
        }>
        {() => (
          <Form>
            <FormField type={'text'} name={'email'} placeholder={'Email'} />
            <FormField
              type={'password'}
              name={'password'}
              placeholder={'Password'}
            />
            <CustomButton text={'Submit'} type={'submit'} />
          </Form>
        )}
      </Formik>
      <CustomButton
        appearence={'ghost'}
        text={'Create an account'}
        type={'submit'}
        className={styles['sign-in']}
        onClick={() => navigate(ROUTES.AUTH.SIGN_UP)}
      />
    </div>
  );
});

SignInForm.displayName = 'SignInForm';
export default SignInForm;
