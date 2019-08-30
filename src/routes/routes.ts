import { AuthorController } from '../controllers/author.controller';
import { PublicationController } from '../controllers/publication.controller';
import { WelcomeController } from '../controllers/welcome.controller';

export class Routes {

  public authorController: AuthorController = new AuthorController();
  public publicationController: PublicationController = new PublicationController();
  public welcomeController: WelcomeController = new WelcomeController();

  public routes(app): void {

    app.route('/')
      .get(this.welcomeController.welcome);

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
