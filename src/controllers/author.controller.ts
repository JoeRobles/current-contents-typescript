import { Request, Response } from 'express';
import { keys } from 'lodash';
import * as uniqid from 'uniqid';

import { AuthorEnum } from '../models/author.enum';
import {
  AuthorParams,
  AuthorParamsPut,
  AuthorParamsScan, AuthorParamsUpdate
} from '../models/author.interface';
import { docClient } from '../models/aws.model';

export class AuthorController {

  public createAuthor(req: Request, res: Response) {
    let Item = req.body.Item;
    Item.authorId = uniqid();
    const params: AuthorParamsPut = {
      TableName: AuthorEnum.TableName,
      Item,
    };
    docClient.put(params, (err, data) => {
      if(err){
        res.send(err);
      }
      res.send(data);
    });
  }

  public deleteAuthor(req: Request, res: Response) {
    const { authorId } = req.params;
    const params: AuthorParams = {
      TableName: AuthorEnum.TableName,
      Key: {
        authorId
      }
    };
    docClient.delete(params, (err, data) => {
      if(err){
        res.send(err);
      }
      res.send(data);
    });
  }

  public getAuthor(req: Request, res: Response) {
    const { authorId } = req.params;
    const params: AuthorParams = {
      TableName: AuthorEnum.TableName,
      Key: {
        authorId
      }
    };
    docClient.get(params, (err, data) => {
      if(err){
        res.send(err);
      }
      res.send(data);
    });
  }

  public listAuthors(req: Request, res: Response) {
    const params: AuthorParamsScan = {
      TableName: AuthorEnum.TableName,
      Limit: 1000,
    };
    docClient.scan(params, (err, data) => {
      if(err){
        res.send(err);
      }
      res.send(data);
    });
  }


  public updateAuthor(req: Request, res: Response) {
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
    docClient.update(params, (err, data) => {
      if(err){
        res.send(err);
      }
      res.send(data);
    })
  }
}
