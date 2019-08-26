import { Request, Response } from 'express';

export class Routes {

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      });

    app.route('/author')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: 'POST request successfulll!!!!'
        })
      });

    app.route('/author/:authorId')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })
      .put((req: Request, res: Response) => {
        res.status(200).send({
          message: 'PUT request successfulll!!!!'
        })
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send({
          message: 'DELETE request successfulll!!!!'
        })
      });

    app.route('/book')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })
      .post((req: Request, res: Response) => {
        res.status(200).send({
          message: 'POST request successfulll!!!!'
        })
      });

    app.route('/book/:bookId')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })
      .put((req: Request, res: Response) => {
        res.status(200).send({
          message: 'PUT request successfulll!!!!'
        })
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send({
          message: 'DELETE request successfulll!!!!'
        })
      });
  }
}
