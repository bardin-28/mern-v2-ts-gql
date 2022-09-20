import React, { memo } from 'react';

import { useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { createLinkValidation } from '../../validations/validations';

import GET_LINK from './queries/getLink.graphql';

import FormField from 'components/Form/FormField';
import { ROUTES } from 'constants/constants';
import { getFormattedDate } from 'utils/helpers';

import styles from './DetailedLink.module.scss';

const DetailedLink = memo(() => {
  const { linkId } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    error,
    refetch,
    data: linkData,
  } = useQuery(GET_LINK, {
    variables: { id: linkId },
  });

  const link = linkData?.getLink;

  return (
    <div className={styles['wrapper']}>
      <div className={styles['info-wrapper']}>
        <div className={styles['title']}>Detailed link info</div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            original: link?.original,
            short: link?.short,
            email: link?.owner?.email,
            date: getFormattedDate(link?.date),
            clicks: link?.clicks,
          }}
          validationSchema={createLinkValidation}
          onSubmit={() => {}}>
          {() => (
            <Form>
              <FormField
                disabled
                label={'Creation date'}
                type={'text'}
                name={'date'}
              />

              <FormField
                disabled
                label={'Owner email'}
                type={'text'}
                name={'email'}
              />

              <div className={styles['columns']}>
                <FormField
                  disabled
                  label={'Original link'}
                  type={'text'}
                  name={'original'}
                />
                <FormField
                  disabled
                  label={'Short link'}
                  type={'text'}
                  name={'short'}
                />
              </div>

              <FormField
                disabled
                label={'Clicks count'}
                type={'text'}
                name={'clicks'}
              />

              {/*<CustomButton text={'Submit'} type={'submit'} />*/}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

DetailedLink.displayName = 'DetailedLink';

export default DetailedLink;
