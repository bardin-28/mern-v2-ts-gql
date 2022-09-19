import * as yup from 'yup';

import { httpRegex } from 'utils/helpers';

export const signInValidation = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Required')
      .test(
        'no-russian',
        "Russian's are not welcome here",
        (value: any) => !value?.includes('.ru')
      ),
    password: yup.string().required('Required'),
  });

export const signUpValidation = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Required')
      .test(
        'no-russian',
        "Russian's are not welcome here",
        (value: any) => !value?.includes('.ru')
      ),
    password: yup
      .string()
      .required('Required')
      .min(8, 'You password must contain min 8 char')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        'Should contain: uppercase,lowercase letters, numbers'
      ),
    confirm_password: yup
      .string()
      .required('Confirm you password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
  });

export const createLinkValidation = () =>
  yup.object().shape({
    original: yup
      .string()
      .required('Required')
      .matches(httpRegex, 'Should contain: http:// or https://'),
  });
