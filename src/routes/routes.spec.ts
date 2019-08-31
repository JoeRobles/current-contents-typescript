import app from '../app';
import { assert } from 'chai';
import { afterEach, before, beforeEach, describe, it } from 'mocha';
import * as request from 'supertest';

import { AuthorController } from '../controllers/author.controller';
import { Routes } from './routes';
import { WelcomeEnum } from '../models/welcome.enum';

describe('Routes', () => {
  let routes: Routes;
  let controller: AuthorController;

  beforeEach(() => {
    routes = new Routes();
    controller = new AuthorController();
  });

  it('should init', () => {
    routes.routes(app);
    assert.isDefined(routes, 'not initialized');
  });

  it('should response from /', async() => {
    const result = await request(app).get('/');
    assert.equal(result.status, 200);
    assert.equal(result.body.message, WelcomeEnum.Message);
  });
});
