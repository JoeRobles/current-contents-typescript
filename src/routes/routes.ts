import { Request, Response } from 'express';

import { AuthorController } from '../controllers/author.controller';
import { PublicationController } from '../controllers/publication.controller';

export class Routes {

  public authorController: AuthorController = new AuthorController();
  public publicationController: PublicationController = new PublicationController();

  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'Welcome to Current Contents.'
        })
      });

    app.route('/author')
      .get(this.authorController.listAuthors)
      .post(this.authorController.createAuthor);

    app.route('/author/:authorId')
      .delete(this.authorController.deleteAuthor)
      .get(this.authorController.getAuthor)
      .put(this.authorController.updateAuthor);

    app.route('/publication')
      .get(this.publicationController.listPublications)
      .post(this.publicationController.createPublication);

    app.route('/publication/:publicationId')
      .delete(this.publicationController.deletePublication)
      .get(this.publicationController.getPublication)
      .put(this.publicationController.updatePublication);
  }
}
