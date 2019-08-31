import { assert } from 'chai';
import { afterEach, before, beforeEach, describe, it } from 'mocha';
import * as sinon from 'sinon';

import { WelcomeController } from './welcome.controller';
import { WelcomeEnum } from '../models/welcome.enum';

describe('WelcomeController', () => {
  let controller: WelcomeController;

  beforeEach(() => {
    controller = new WelcomeController();
  });

  it('should init', () => {
    assert.isDefined(controller, 'not initialized');
  });

  it('should welcome', () => {
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
