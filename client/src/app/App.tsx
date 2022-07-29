import React from 'react';

import { useQuery, gql } from '@apollo/client';

function App() {
  const GET_USER = gql`
    query GetUser($email: String!) {
      getUser(email: $email) {
        email
        first_name
        last_name
      }
    }
  `;

  function DisplayLocations({ email }): any {
    const { loading, error, data } = useQuery(GET_USER, {
      variables: { email },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return JSON.stringify(data);
  }

  return (
    <div>
      <h1>Learn TS</h1>
      <DisplayLocations email="bardindeveloper@gmail.com" />
    </div>
  );
}

export default App;
