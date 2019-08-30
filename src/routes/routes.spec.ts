import app from '../app';
import { assert } from 'chai';
import { afterEach, before, beforeEach, suite, test } from 'mocha';
import * as request from 'supertest';

import { AuthorController } from '../controllers/author.controller';
import { Routes } from './routes';
import { WelcomeEnum } from '../models/welcome.enum';

suite('Routes', () => {
  let routes: Routes;
  let controller: AuthorController;

  beforeEach(() => {
    routes = new Routes();
    controller = new AuthorController();
  });

  test('should init', () => {
    routes.routes(app);
    assert.isDefined(routes, 'not initialized');
  });

  test('should response from /', async() => {
    const result = await request(app).get('/');
    assert.equal(result.status, 200);
    assert.equal(result.body.message, WelcomeEnum.Message);
  });
});
