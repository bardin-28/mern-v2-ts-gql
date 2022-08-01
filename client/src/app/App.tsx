import React from 'react';

import { useQuery, gql } from '@apollo/client';

import AppRoutes from '../routes/AppRoutes';

import getAllUsersQuery from 'graphql/queries/getAllUsers.graphql';

function App() {
  function DisplayAllUsers(): any {
    const { loading, error, data } = useQuery(
      gql`
        ${getAllUsersQuery}
      `
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;

    return (
      <>
        {data?.getAllUsers?.map((item, index) => (
          <div key={index}>
            {item?.first_name} {item?.last_name}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {/*<h1>Learn TS + GraphQL</h1>*/}
      {/*<DisplayAllUsers />*/}
      <AppRoutes />
    </>
  );
}

export default App;
