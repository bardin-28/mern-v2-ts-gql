import React, { memo } from 'react';

import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';

import { createLinkValidation } from '../../validations/validations';

import CREATE_LINK from './queries/createLink.graphql';

import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';
import { isURL } from 'utils/helpers';

import styles from './CreateLink.module.scss';

const initialValues = {
  from: '',
  to: '',
};

const CreateLink = memo(() => {
  console.log('create');
  const [createLink, { error, data: linkData }] = useMutation(CREATE_LINK);

  return (
    <div className={styles.wrapper}>
      Create link
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={createLinkValidation}
        onSubmit={({ from, to }, { resetForm }) => {
          createLink({
            variables: { from, to },
          });

          resetForm();
        }}>
        {() => (
          <Form>
            <FormField type={'text'} name={'from'} placeholder={'From'} />
            <FormField type={'text'} name={'to'} placeholder={'To'} />

            <CustomButton text={'Submit'} type={'submit'} />

            {linkData && <div>Link created.</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
});

CreateLink.displayName = 'CreateLink';

export default CreateLink;
