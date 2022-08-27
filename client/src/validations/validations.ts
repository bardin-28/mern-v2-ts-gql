import * as yup from 'yup';

export const signInValidation = () =>
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
