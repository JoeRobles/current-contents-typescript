import { keys } from 'lodash';
import * as uniqid from 'uniqid';

import { AuthorEnum } from '../models/author.enum';
import {
  AuthorParams,
  AuthorParamsPut,
  AuthorParamsScan,
  AuthorParamsUpdate
} from '../models/author.interface';
import { docClient } from '../models/aws.model';

export class AuthorController {

  public uuid;
  private _docClient = docClient;

  public createAuthor(req, res): void {
    let Item = req.body.Item;
    this.uuid = uniqid();
    Item.authorId = this.uuid;
    const params: AuthorParamsPut = {
      TableName: AuthorEnum.TableName,
      Item,
    };
    this._docClient.put(params, (err, data): void => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public deleteAuthor(req, res): void {
    const { authorId } = req.params;
    const params: AuthorParams = {
      TableName: AuthorEnum.TableName,
      Key: {
        authorId
      }
    };
    this._docClient.delete(params, (err, data): void => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public getAuthor(req, res): void {
    const { authorId } = req.params;
    const params: AuthorParams = {
      TableName: AuthorEnum.TableName,
      Key: {
        authorId
      }
    };
    this._docClient.get(params, (err, data): void => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public listAuthors(req, res): void {
    const params: AuthorParamsScan = {
      TableName: AuthorEnum.TableName,
      Limit: 1000,
    };
    this._docClient.scan(params, (err, data): void => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }


  public updateAuthor(req, res): void {
    let UpdateExpression = [], ExpressionAttributeValues = [];
    const Item = req.body.Item;
    const { authorId } = req.params;

    keys(Item).forEach((k) => {
      UpdateExpression.push(`${k} = :${k}`);
      ExpressionAttributeValues[`:${k}`] = Item[k];
    });

    ExpressionAttributeValues[`:${AuthorEnum.TableKey}`] = authorId;

    const params: AuthorParamsUpdate = {
      TableName: AuthorEnum.TableName,
      Key: {
        authorId
      },
      ConditionExpression: `${AuthorEnum.TableKey} = :${AuthorEnum.TableKey}`,
      UpdateExpression: 'set ' + UpdateExpression.join(', '),
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };
    this._docClient.update(params, (err, data): void => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    })
  }
}
