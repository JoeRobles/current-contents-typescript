import { assert } from 'chai';
import { beforeEach, suite, test } from 'mocha';
import * as sinon from 'sinon';

import { AuthorController } from './author.controller';
import { AuthorEnum } from '../models/author.enum';
import { mock } from "aws-sdk-mock";
import { PublicationEnum } from "../models/publication.enum";

suite('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(() => {
    controller = new AuthorController();
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should create author', () => {
    const req = {
      body: {
        Item: {
          authorId: '123456',
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'Author Name'
        }
      }
    };
    mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {Item: req.body.Item});
    });
    const spy = sinon.spy((controller as any)._docClient, 'put');
    const res = { send: () => {} };
    controller.createAuthor(req, res);

    assert.isTrue(spy.withArgs({
      TableName: AuthorEnum.TableName,
      Item: req.body.Item,
    }).called);
    spy.restore();
  });

  test('should throw an error on creating an author', () => {
    const error = new Error('error');
    mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(new Error("Your error"));
    });
    const spy = sinon.spy((controller as any)._docClient, 'put');
    const req = {
      body: {
        Item: {
          authorId: controller.uuid,
          birthDate: '01/01/1970',
          email: 'a@b.co',
          authorName: 'Author Name'
        }
      }
    };
    const res = { send: () => {} };

    controller.createAuthor(req, res);

    assert.isTrue(spy.withArgs({
      TableName: AuthorEnum.TableName,
      Item: req.body.Item,
    }).called);
    spy.restore();
  });
});
