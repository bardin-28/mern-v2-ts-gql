import React, { memo } from 'react';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';

import styles from './SignIn.module.scss';

const initialValues = {
  email: '',
  password: '',
};

const validate = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Required')
      // eslint-disable-next-line
      .test('no-russian', 'Russian\'s are not welcome here', (value: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return !value?.includes('.ru');
      }),
    password: yup.string().required('Required'),
  });

const SignInForm = memo(() => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>Sign in</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => console.log(values)}>
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
));

SignInForm.displayName = 'SignInForm';
export default SignInForm;
