import { WelcomeEnum } from '../models/welcome.enum';

export class WelcomeController {

  public welcome(req, res): void {
    res.status(200);
    res.send({
      message: WelcomeEnum.Message
    });
  }
}
