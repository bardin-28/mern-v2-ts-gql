import React, { memo } from 'react';

import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';

import { createLinkValidation } from '../../validations/validations';

import CREATE_LINK from './queries/createLink.graphql';

import CustomButton from 'components/CustomButton';
import FormField from 'components/Form/FormField';
import GET_USER_LINKS from 'pages/Dashboard/queries/getUserLinks.graphql';

import styles from './CreateLink.module.scss';

const initialValues = {
  original: '',
};

const CreateLink = memo(() => {
  console.log('create');
  const [createLink, { error, data: linkData }] = useMutation(CREATE_LINK, {
    refetchQueries: [{ query: GET_USER_LINKS }],
  });

  return (
    <div className={styles.wrapper}>
      Create link
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={createLinkValidation}
        onSubmit={({ original }, { resetForm }) => {
          createLink({
            variables: { original },
          });

          resetForm();
        }}>
        {() => (
          <Form>
            <FormField type={'text'} name={'original'} placeholder={'From'} />

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
