import { AuthorItem, AuthorParams, AuthorParamsPut, AuthorParamsScan, AuthorParamsUpdate } from './author.interface';
import { AuthorEnum } from './author.enum';

export const AuthorStub = {
  AuthorParams: <AuthorParams> {
    TableName: AuthorEnum.TableName,
    Key: {
      authorId: '123456'
    }
  },
  AuthorParamsPut: <AuthorParamsPut> {
    TableName: AuthorEnum.TableName,
    Item: {
      authorId: '123456',
      birthDate: '01/01/1970',
      email: 'a@b.co',
      authorName: 'John Doe'
    }
  },
  AuthorParamsScan: <AuthorParamsScan> {
    TableName: AuthorEnum.TableName,
    Limit: AuthorEnum.Limit
  },
  AuthorParamsUpdate: <AuthorParamsUpdate> {
    TableName: AuthorEnum.TableName,
    Key: {
      authorId: '123456'
    },
    ConditionExpression: 'authorId = :authorId',
    UpdateExpression: 'set authorId = :authorId, birthDate = :birthDate, email = :email, authorName = :authorName',
    ExpressionAttributeValues: [
      ':authorId: 123456',
      ':birthDate: 01/01/1970',
      ':email: a@b.co',
      ':authorName: John Doe'
    ],
    ReturnValues: 'UPDATED_NEW'
  },
  AuthorItem: <AuthorItem> {
    authorId: '123456',
    birthDate: '01/01/1970',
    email: 'a@b.co',
    authorName: 'John Doe'
  }
};
