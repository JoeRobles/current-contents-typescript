import { assert } from 'chai';
import { beforeEach, suite, test } from 'mocha';
import * as sinon from 'sinon';

import { AuthorController } from './author.controller';
import { AuthorEnum } from '../models/author.enum';

suite('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(() => {
    controller = new AuthorController();
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should create author', () => {
    const spy = sinon.spy((controller as any)._docClient, 'put');
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
    const res = {};
    controller.createAuthor(req, res);

    assert.isTrue(spy.withArgs({
      TableName: AuthorEnum.TableName,
      Item: req.body.Item,
    }));
  });
});
