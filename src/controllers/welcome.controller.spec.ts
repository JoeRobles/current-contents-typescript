import { assert } from 'chai';
import { afterEach, before, beforeEach, suite, test } from 'mocha';
import * as sinon from 'sinon';

import { WelcomeController } from './welcome.controller';
import { WelcomeEnum } from '../models/welcome.enum';

suite('WelcomeController', () => {
  let controller: WelcomeController;

  beforeEach(() => {
    controller = new WelcomeController();
  });

  test('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  test('should welcome', () => {
    const status = sinon.spy();
    const send = sinon.spy();
    const req = {
      body: {}
    };
    const res = {
      status,
      send
    };
    controller.welcome(req, res);

    assert.isTrue(status.withArgs(200).called, 'status not sent');
    assert.isTrue(send.withArgs({ message: WelcomeEnum.Message }).called, 'message not sent');
  });
});
