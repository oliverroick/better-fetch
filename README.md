# better-fetch

A fetch-like alternative that resolves the promise when the request is successful and rejects it otherwise. This allows you to both handle HTTP errors and process the response. This comes in handy when working with REST APIs.

## Install

```
npm install --save better-fetch
```

## Usage

### Basic example

```javascript
import request from 'better-fetch';

request('http://example.com/').then(
  success => {
    // handle success response
  },
  error => {
    // handle error response
  }
);
```

Both `success` and `error` are `Objects` that have the following members:

| Member            | Type          | Description                          |
| ----------------- | ------------- | ------------------------------------ |
| `status`          | `int`         | HTTP status code, e.g. `200`         |
| `statusText`      | `String`      | HTTP status, e.g. `OK`               |
| `content`         | `String` or `Object`| The HTTP response. If the response is of content type `application/json`, the response will be parsed into an an `Object`, otherwise it's a `String`  |

### POST example

```javascript
import request from 'better-fetch';

const requestOptions = {
  method: 'POST',
  body: {"some": "data"}
}

request('http://example.com/', requestOptions).then(
  success => {
    // handle success response
  },
  error => {
    // handle error response
  }
);

```

### Setting request headers

```javascript
import request from 'better-fetch';

const requestOptions = {
  headers: {
    Authorization: 'Token ojasd9usduhfs',
    Accept: 'application/json',
  }
}

request('http://example.com/', requestOptions).then(
  success => {
    // handle success response
  },
  error => {
    // handle error response
  }
);

```

## API

### `request(url, requestOptions)`

#### Parameters

| Parameter         | Type          | Description                          |
| ----------------- | ------------- | ------------------------------------ |
| `url`             | `String`      | The request URL.                     |
| `requestOptions`  | `Object`      | Request method, payload and headers. |

##### `requestOptions`

| Parameter | Type               | Description                                        |
| ----------| ------------------ | -------------------------------------------------- |
| `method`  | `String`           | The request URL.                                   |
| `body`    | `String`, `Object` | Request payload. Either a JSON object or a string. |
| `headers` | `Object`           | Request headers, key-value pairs.                  |
