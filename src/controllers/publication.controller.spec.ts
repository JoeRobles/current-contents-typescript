import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { assert } from 'chai';
import { afterEach, before, beforeEach, suite, test } from 'mocha';

import { PublicationController } from './publication.controller';

suite('PublicationController', () => {
  let controller: PublicationController;
  let error = new Error('Your error');

  before(async (done) => {
    done();
  });

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
    controller = new PublicationController();
  });

  afterEach(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should create a publication', async () => {
    const req = {
      body: {
        Item: {
          title: 'title',
          publicationDate: '01/01/1970',
          body: 'publication body'
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

    controller.createPublication(req, res);

    assert.deepEqual(await client.put(params).promise(), payload);
  });

  test('should throw an error on creating a publication', async () => {
    const req = {
      body: {
        Item: {
          title: 'title',
          publicationDate: '01/01/1970',
          body: 'publication body'
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

    controller.createPublication(req, res);

    await client.put(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should delete a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };
    const payload = { TableName: '', Item: req.params.publicationId };

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

    controller.deletePublication(req, res);

    assert.deepEqual(await client.delete(params).promise(), payload);
  });

  test('should throw an error on deleting a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
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

    controller.deletePublication(req, res);

    await client.delete(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should get a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };
    const payload = { Item: req.params.publicationId };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(null, payload);
    });

    let input = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {
      }
    };

    controller.getPublication(req, res);

    assert.deepEqual(await client.get(input).promise(), payload);
  });

  test('should throw an error on getting a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(error);
    });

    let input = {
      TableName: '',
      Key: {}
    };
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const res = {
      send: () => {}
    };

    controller.getPublication(req, res);

    await client.get(input).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should list all publications', async () => {
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

    controller.listPublications(req, res);

    assert.deepEqual(await client.scan(params).promise(), payload);
  });

  test('should throw an error on listing all publications', async () => {
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

    controller.listPublications(req, res);

    await client.scan(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });

  test('should update a publication', async () => {
    const req = {
      body: {
        Item: {
          publicationId: '123456',
          title: 'title',
          publicationDate: '01/01/1970',
          body: 'publication body'
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

    controller.updatePublication(req, res);

    assert.deepEqual(await client.update(params).promise(), payload);
  });

  test('should throw an error on updating an author', async () => {
    const req = {
      body: {
        Item: {
          publicationId: '123456',
          title: 'title',
          publicationDate: '01/01/1970',
          body: 'publication body'
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

    controller.updatePublication(req, res);

    await client.update(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );
  });
});
