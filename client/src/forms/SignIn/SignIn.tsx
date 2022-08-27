import React, { memo, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';

import SIGN_IN_USER from './queries/signInUser.graphql';

import { useGlobalState } from 'app/store';
import { STORE_ACTIONS } from 'app/store/constants';
import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';
import { signInValidation } from 'validations/validations';

import styles from './SignIn.module.scss';

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = memo(() => {
  const [signIn, { error, data: loginData }] = useMutation(SIGN_IN_USER);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (loginData) {
      successLoginHandler(loginData?.loginUser);
    }
    if (error) {
      console.log('error:', error);
    }
  }, [loginData, error]);

  const successLoginHandler = (data) => {
    dispatch({ type: STORE_ACTIONS.USER_LOGIN });
    localStorage.setItem('token', data.token);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign in</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidation}
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
    </div>
  );
});

SignInForm.displayName = 'SignInForm';
export default SignInForm;
