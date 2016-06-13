import { Promise } from 'es6-promise';

const request = (url, requestParams = {}) => {
  const method = requestParams.method || 'GET';
  const headers = requestParams.headers || {};
  const body = requestParams.body || null;

  const promise = new Promise(function req(resolve, reject) {
    const client = new XMLHttpRequest();
    client.open(method, url, true);

    for (const header in headers) {
      if (header in headers) {
        client.setRequestHeader(header, headers[header]);
      }
    }

    client.send(body);

    client.onload = (event) => {
      let content = client.response;
      if (client.getResponseHeader('content-type') === 'application/json') {
        content = JSON.parse(client.response);
      }

      const response = {
        status: client.status,
        statusText: client.statusText,
        content,
      };

      if (client.status >= 200 && client.status < 300) {
        resolve(response);
      } else {
        reject(response);
      }
    }

    client.onerror = () => {
      reject('Unable to connect to the server.');
    };
  });

  return promise;
};

export default request;
