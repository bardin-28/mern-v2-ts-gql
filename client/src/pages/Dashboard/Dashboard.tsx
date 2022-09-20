import React, { FC } from 'react';

import { useQuery } from '@apollo/client';

import GET_USER_LINKS from './queries/getUserLinks.graphql';

import LinksTable from 'components/LinksTable';

import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  const { loading, error, refetch, data: userLinks } = useQuery(GET_USER_LINKS);
  const links = userLinks?.getCurrentUser?.links;

  return (
    <div className={styles.wrapper}>
      <LinksTable links={links} update={refetch} />
    </div>
  );
};

export default Dashboard;
