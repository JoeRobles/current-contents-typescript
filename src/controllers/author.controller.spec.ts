import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { assert } from 'chai';
import { afterEach, before, beforeEach, describe, it } from 'mocha';

import { AuthorController } from './author.controller';
import { AuthorEnum } from '../models/author.enum';
import { AuthorParams, AuthorParamsPut, AuthorParamsScan, AuthorParamsUpdate } from '../models/author.interface';
import { AuthorStub } from '../models/author.stub';

describe('AuthorController', () => {
  let controller: AuthorController, error = new Error('Your error');
  const apiVersion = { apiVersion: '2012-08-10' },
  defaultAuthor: AuthorParams = {
    TableName: <string> AuthorEnum.TableName,
    Key: {
      authorId: '123456'
    }
  },
  defaultAuthorParams: AuthorParamsPut = {
    TableName: <string> AuthorEnum.TableName,
    Item: {
      authorId: '123456'
    }
  },
  res = {
    send: () => {}
  };

  before(async (done) => {
    done();
  });

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
    controller = new AuthorController();
  });

  it('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  it('should create an author', async () => {
    const req = {
      body: {
        Item: AuthorStub.AuthorItem
      }
    },
    payload: AuthorParamsPut = {
      TableName: <string> AuthorEnum.TableName,
      Item: req.body.Item
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultAuthorParams;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.createAuthor(req, res);

    assert.deepEqual(await client.put(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on creating an author', async () => {
    const req = {
      body: {
        Item: AuthorStub.AuthorItem
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: <string> AuthorEnum.TableName,
      Item: req.body.Item
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.createAuthor(req, res);

    await client.put(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should delete an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };
    const payload: AuthorParams = {
      TableName: <string> AuthorEnum.TableName,
      Key: {
        authorId: req.params.authorId
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultAuthor;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.deleteAuthor(req, res);

    assert.deepEqual(await client.delete(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on deleting an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(error);
    });

    let params = defaultAuthor;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.deleteAuthor(req, res);

    await client.delete(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should get an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };
    const payload = { Item: req.params.authorId };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultAuthor;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.getAuthor(req, res);

    assert.deepEqual(await client.get(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on getting an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(error);
    });

    let params = defaultAuthor;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.getAuthor(req, res);

    await client.get(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should list all authors', async () => {
    const req = {
      params: {}
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(null, payload);
    });

    let params: AuthorParamsScan = {
      TableName: <string> AuthorEnum.TableName,
      Limit: <number> AuthorEnum.Limit,
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.listAuthors(req, res);

    assert.deepEqual(await client.scan(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on listing all authors', async () => {
    const req = {
      params: {}
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(error);
    });

    let params: AuthorParamsScan = {
      TableName: <string> AuthorEnum.TableName,
      Limit: <number> AuthorEnum.Limit
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.listAuthors(req, res);

    await client.scan(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should update an author', async () => {
    const req = {
      body: {
        Item: AuthorStub.AuthorItem
      },
      params: {
        authorId: '123456',
      }
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(null, payload);
    });

    let params: AuthorParamsUpdate = AuthorStub.AuthorParamsUpdate;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.updateAuthor(req, res);

    assert.deepEqual(await client.update(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on updating an author', async () => {
    const req = {
      body: {
        Item: AuthorStub.AuthorItem
      },
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(error);
    });

    let params: AuthorParamsUpdate = AuthorStub.AuthorParamsUpdate;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.updateAuthor(req, res);

    await client.update(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });
});
