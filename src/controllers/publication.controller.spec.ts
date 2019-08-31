import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { assert } from 'chai';
import { afterEach, before, beforeEach, describe, it } from 'mocha';

import { PublicationController } from './publication.controller';
import { PublicationEnum } from '../models/publication.enum';
import {
  PublicationParams,
  PublicationParamsPut,
  PublicationParamsScan,
  PublicationParamsUpdate
} from '../models/publication.interface';
import { PublicationStub } from '../models/publication.stub';

describe('PublicationController', () => {
  let controller: PublicationController, error = new Error('Your error');
  const apiVersion = { apiVersion: '2012-08-10' },
    defaultPublication: PublicationParams = {
      TableName: <string> PublicationEnum.TableName,
      Key: {
        publicationId: '123456'
      }
    },
    defaultPublicationParams: PublicationParamsPut = {
      TableName: <string> PublicationEnum.TableName,
      Item: {
        publicationId: '123456'
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
    controller = new PublicationController();
  });

  it('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  it('should create a publication', async () => {
    const req = {
      body: {
        Item: PublicationStub.PublicationItem
      }
    },
    payload: PublicationParamsPut = {
      TableName: <string> PublicationEnum.TableName,
      Item: req.body.Item
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultPublicationParams;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.createPublication(req, res);

    assert.deepEqual(await client.put(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on creating a publication', async () => {
    const req = {
      body: {
        Item: PublicationStub.PublicationItem
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback: Function) => {
      callback(error);
    });

    let params = {
      TableName: <string> PublicationEnum.TableName,
      Item: req.body.Item
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.createPublication(req, res);

    await client.put(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should delete a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };
    const payload: PublicationParams = {
      TableName: <string> PublicationEnum.TableName,
      Key: {
        publicationId: req.params.publicationId
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultPublication;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.deletePublication(req, res);

    assert.deepEqual(await client.delete(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on deleting a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback: Function) => {
      callback(error);
    });

    let params = defaultPublication;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.deletePublication(req, res);

    await client.delete(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should get a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };
    const payload = { Item: req.params.publicationId };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(null, payload);
    });

    let params = defaultPublication;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.getPublication(req, res);

    assert.deepEqual(await client.get(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on getting a publication', async () => {
    const req = {
      params: {
        publicationId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params, callback: Function) => {
      callback(error);
    });

    let params = defaultPublication;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.getPublication(req, res);

    await client.get(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should list all publications', async () => {
    const req = {
      params: {}
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(null, payload);
    });

    let params: PublicationParamsScan = {
      TableName: <string> PublicationEnum.TableName,
      Limit: <number> PublicationEnum.Limit,
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.listPublications(req, res);

    assert.deepEqual(await client.scan(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on listing all publications', async () => {
    const req = {
      params: {}
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback: Function) => {
      callback(error);
    });

    let params: PublicationParamsScan = {
      TableName: <string> PublicationEnum.TableName,
      Limit: <number> PublicationEnum.Limit
    };
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.listPublications(req, res);

    await client.scan(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should update a publication', async () => {
    const req = {
      body: {
        Item: PublicationStub.PublicationItem
      },
      params: {
        authorId: '123456',
      }
    };
    const payload = { Items: {} };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(null, payload);
    });

    let params: PublicationParamsUpdate = PublicationStub.PublicationParamsUpdate;
    const client = new AWS.DynamoDB.DocumentClient(apiVersion);
    controller.updatePublication(req, res);

    assert.deepEqual(await client.update(params).promise(), payload);

    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should throw an error on updating an author', async () => {
    const req = {
      body: {
        Item: PublicationStub.PublicationItem
      },
      params: {
        authorId: '123456',
      }
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'update', (params, callback: Function) => {
      callback(error);
    });

    let params: PublicationParamsUpdate = PublicationStub.PublicationParamsUpdate;
    const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    controller.updatePublication(req, res);

    await client.update(params).promise().then(
      () => {},
      (e) => {
        assert.equal(e, error);
      }
    );

    AWSMock.restore('DynamoDB.DocumentClient');
  });
});
