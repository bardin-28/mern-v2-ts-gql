/**
 *
 * @param to - endpoint
 * @param method - one of request methods post | delete | get | patch | put
 * @param data - sending body data
 * @param headers - sending custom headers
 * @return {Promise<any>}
 */

interface FetchDataProps {
  headers?: object;
  method: string;
  data?: never;
  to: string;
}

export const fetchData = async ({
  data,
  headers,
  method,
  to,
}: FetchDataProps) => {
  const { token } = localStorage;

  const authToken = token ? `Bearer ${token}` : '';

  await fetch(`${to}`, {
    method, // *GET, POST, PUT, DELETE
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
      ...headers,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result, 'success');

      return result;
    })
    .catch((errors) => {
      console.error('Errors:', errors);

      return errors;
    });
};

export default fetchData;
