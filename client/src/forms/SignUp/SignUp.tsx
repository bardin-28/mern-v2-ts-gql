import React, { memo, useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import SIGN_UP_USER from './queries/signUpUser.graphql';

import { useGlobalState } from 'app/store';
import { STORE_ACTIONS } from 'app/store/constants';
import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';
import { ROUTES } from 'constants/constants';
import { signUpValidation } from 'validations/validations';

import styles from './SignUp.module.scss';

const initialValues = {
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
};

const SignUpForm = () => {
  const [signUp, { error, data: registerData }] = useMutation(SIGN_UP_USER);
  const [state, dispatch] = useGlobalState();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
    if (registerData) {
      successLoginHandler(registerData?.createUser);
    }
    if (error) {
      if (error.message === 'User already exist') {
        setErrors({ email: 'User already exist' });
      }
    }
  }, [registerData, error]);

  const successLoginHandler = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: STORE_ACTIONS.USER_LOGIN });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign up</h2>
      <Formik
        enableReinitialize={true}
        initialErrors={errors}
        initialValues={initialValues}
        validationSchema={signUpValidation}
        onSubmit={({ email, password, first_name, last_name }) =>
          signUp({
            variables: { email, password, first_name, last_name },
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
            <FormField
              type={'password'}
              name={'confirm_password'}
              placeholder={'Confirm password'}
            />

            <FormField
              type={'text'}
              name={'first_name'}
              placeholder={'First name'}
            />
            <FormField
              type={'text'}
              name={'last_name'}
              placeholder={'Last name'}
            />
            <CustomButton text={'Submit'} type={'submit'} />
          </Form>
        )}
      </Formik>
      <CustomButton
        appearence={'ghost'}
        text={'Sign in'}
        type={'submit'}
        className={styles['sign-in']}
        onClick={() => navigate(ROUTES.AUTH.SIGN_IN)}
      />
    </div>
  );
};

export default SignUpForm;
