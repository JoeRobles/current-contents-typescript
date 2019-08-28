import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { assert } from 'chai';
import { afterEach, before, beforeEach, suite, test } from 'mocha';

import { AuthorController } from './author.controller';

suite('AuthorController', () => {
  let controller: AuthorController;
  let error = new Error('Your error');

  before(async (done) => {
    done();
  });

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
    controller = new AuthorController();
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should create an author', async () => {
    const req = {
      body: {
        Item: {
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'author name'
        }
      }
    };
    const payload = { TableName: '', Item: req.body.Item };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = {
      TableName: '',
      Item: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.createAuthor(req, res);

    assert.deepEqual(await client.put(params).promise(), payload);
  });

  test('should throw an error on creating an author', async () => {
    const req = {
      body: {
        Item: {
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'author name'
        }
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: '',
      Item: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.createAuthor(req, res);

    await client.put(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should delete an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };
    const payload = { TableName: '', Item: req.params.authorId };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.deleteAuthor(req, res);

    assert.deepEqual(await client.delete(params).promise(), payload);
  });

  test('should throw an error on deleting an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.deleteAuthor(req, res);

    await client.delete(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should get an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };
    const payload = { Item: req.params.authorId };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.getAuthor(req, res);

    assert.deepEqual(await client.get(params).promise(), payload);
  });

  test('should throw an error on getting an author', async () => {
    const req = {
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.getAuthor(req, res);

    await client.get(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should list all authors', async () => {
    const req = {
      params: {}
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = {
      TableName: '',
      Limit: 1000,
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.listAuthors(req, res);

    assert.deepEqual(await client.scan(params).promise(), payload);
  });

  test('should throw an error on listing all authors', async () => {
    const req = {
      params: {}
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: '',
      Limit: 1000
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.listAuthors(req, res);

    await client.scan(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should update an author', async () => {
    const req = {
      body: {
        Item: {
          authorId: '123456',
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'author name'
        }
      },
      params: {
        authorId: '123456',
      }
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = {
      TableName: '',
      Key: {},
      ConditionExpression: 'a = :b',
      UpdateExpression: 'set ',
      ExpressionAttributeValues: [''],
      ReturnValues: 'UPDATED_NEW',
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.updateAuthor(req, res);

    assert.deepEqual(await client.update(params).promise(), payload);
  });

  test('should throw an error on updating an author', async () => {
    const req = {
      body: {
        Item: {
          authorId: '123456',
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'author name'
        }
      },
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: '',
      Key: {},
      ConditionExpression: 'a = :b',
      UpdateExpression: 'set ',
      ExpressionAttributeValues: [''],
      ReturnValues: 'UPDATED_NEW',
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.updateAuthor(req, res);

    await client.update(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });
});
