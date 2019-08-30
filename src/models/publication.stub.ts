import { PublicationItem, PublicationParams, PublicationParamsPut, PublicationParamsScan, PublicationParamsUpdate } from './publication.interface';
import { PublicationEnum } from './publication.enum';

export const PublicationStub = {
  PublicationParams: <PublicationParams> {
    TableName: PublicationEnum.TableName,
    Key: {
      publicationId: this.PublicationItem
    }
  },
  PublicationParamsPut: <PublicationParamsPut> {
    TableName: PublicationEnum.TableName,
    Item: this.PublicationItem
  },
  PublicationParamsScan: <PublicationParamsScan> {
    TableName: PublicationEnum.TableName,
    Limit: 1000
  },
  PublicationParamsUpdate: <PublicationParamsUpdate> {
    TableName: 'CC_Publication',
    Key: {
      publicationId: '123456'
    },
    ConditionExpression: 'publicationId = :publicationId',
    UpdateExpression: 'set publicationId = :publicationId, title = :title, publicationDate = :publicationDate, body = :body',
    ExpressionAttributeValues: [
      ':publicationId: 123456',
      ':title: Publication title',
      ':publicationDate: 01/01/1970',
      ':body: Publication body'
    ],
    ReturnValues: 'UPDATED_NEW'
  },
  PublicationItem: <PublicationItem> {
    publicationId: '123456',
    title: 'Publication title',
    publicationDate: '01/01/1970',
    body: 'Publication body'
  }
};
