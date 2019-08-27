import { assert } from 'chai';
import { beforeEach, suite, test } from 'mocha';
import * as sinon from 'sinon';

import { PublicationController } from './publication.controller';
import { PublicationEnum } from '../models/publication.enum';
import { mock } from 'aws-sdk-mock';

suite('PublicationController', () => {
  let controller: PublicationController;

  beforeEach(() => {
    controller = new PublicationController();
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should create a publication', () => {
    const req = {
      body: {
        Item: {
          publicationId: '123456',
          title: 'Title',
          publicationDate: '01/01/1970',
          body: 'Publication body'
        }
      }
    };
    mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {Item: req.body.Item});
    });
    const spy = sinon.spy((controller as any)._docClient, 'put');
    const res = { send: () => {} };
    controller.createPublication(req, res);

    assert.isTrue(spy.withArgs({
      TableName: PublicationEnum.TableName,
      Item: req.body.Item,
    }).called);
    spy.restore();
  });

  test('should throw an error on creating a publication', () => {
    const error = new Error('error');
    mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(new Error("Your error"));
    });
    const spy = sinon.spy((controller as any)._docClient, 'put');
    const req = {
      body: {
        Item: {
          publicationId: controller.uuid,
          title: 'Title',
          publicationDate: '01/01/1970',
          body: 'Publication body'
        }
      }
    };
    const res = { send: () => {} };

    controller.createPublication(req, res);

    assert.isTrue(spy.withArgs({
      TableName: PublicationEnum.TableName,
      Item: req.body.Item,
    }).called);
    spy.restore();
  });
});
