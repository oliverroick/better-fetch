import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
import nock from 'nock';

import request from '../src/request';

describe('Request', () => {
  it('sends a simple GET request', () => {
    const response = '{ "some": "Response" }';
    nock('http://example.com')
      .get('/')
      .reply(200, response);

    const expected = {
      status: 200,
      statusText: 'OK',
      content: response,
    };

    return request('http://example.com/').then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });

  it('sends a simple POST request', () => {
    const response = '{ "some": "Response" }';

    nock('http://example.com')
      .post('/', response)
      .reply(200, response);

    const requestParams = {
      method: 'POST',
      body: response,
    };

    const expected = {
      status: 200,
      statusText: 'OK',
      content: response,
    };

    return request('http://example.com/', requestParams).then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });

  it('sends a simple PATCH request', () => {
    const response = '{ "some": "Response" }';

    nock('http://example.com')
      .patch('/', response)
      .reply(200, response);

    const expected = {
      status: 200,
      statusText: 'OK',
      content: response,
    };

    const requestParams = {
      method: 'PATCH',
      body: response,
    };

    return request('http://example.com/', requestParams).then(
        success => expect(success).to.deep.equal(expected),
        error => assert(false, 'Error called with: ' + error)
    );
  });

  it('sends a simple PUT request', () => {
    const response = '{ "some": "Response" }';

    nock('http://example.com')
      .put('/', response)
      .reply(200, response);

    const requestParams = {
      method: 'PUT',
      body: response,
    };

    const expected = {
      status: 200,
      statusText: 'OK',
      content: response,
    };

    return request('http://example.com/', requestParams).then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });

  it('sends a simple DELETE request', () => {
    const response = '{ "some": "Response" }';

    nock('http://example.com')
      .delete('/')
      .reply(200, response);

    const requestParams = { method: 'DELETE' };

    const expected = {
      status: 200,
      statusText: 'OK',
      content: response,
    };

    return request('http://example.com/', requestParams).then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });

  it('returns the error', () => {
    const response = '{ "some": "Response" }';
    nock('http://example.com')
      .get('/')
      .reply(404, response);

    const expected = {
      status: 404,
      statusText: 'Not Found',
      content: response,
    };

    return request('http://example.com/').then(
      success => assert(false, 'success called with: ' + success),
      error => expect(error).to.deep.equal(expected)
    );
  });

  it('parses a JSON response', () => {
    const response = '{ "some": "Response" }';

    nock('http://example.com')
      .get('/')
      .reply(200, response, {
        'Content-Type': 'application/json',
      });

    const expected = {
      status: 200,
      statusText: 'OK',
      content: JSON.parse(response),
    };

    return request('http://example.com/').then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });

  it('assigns request headers', () => {
    const response = '{ "some": "Response" }';

    const reqOpt = {
      reqheaders: {
        Authorization: 'Token ojasd9usduhfs',
        Accept: 'application/json',
      },
    };

    nock('http://example.com', reqOpt)
      .get('/')
      .reply(200, response, {
        'Content-Type': 'application/json',
      });

    const expected = {
      status: 200,
      statusText: 'OK',
      content: JSON.parse(response),
    };

    const reqParams = {
      headers: {
        Authorization: 'Token ojasd9usduhfs',
        Accept: 'application/json',
      },
    };

    return request('http://example.com/', reqParams).then(
      success => expect(success).to.deep.equal(expected),
      error => assert(false, 'Error called with: ' + error)
    );
  });
});
