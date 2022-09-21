import React, { FC } from 'react';

import { useQuery } from '@apollo/client';

import GET_USER_LINKS from './queries/getUserLinks.graphql';

import LinksTable from 'components/LinksTable';

import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  const {
    loading,
    error,
    refetch,
    fetchMore,
    data: userLinks,
  } = useQuery(GET_USER_LINKS, {
    variables: { limit: 20, offset: 0 },
  });

  const links = userLinks?.getUserLinks;

  console.log(userLinks, 'dd');

  return (
    <div className={styles.wrapper}>
      <LinksTable
        links={links}
        update={refetch}
        fetchMore={fetchMore}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
