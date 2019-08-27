import { Request, Response } from 'express';
import { keys } from 'lodash';
import * as uniqid from 'uniqid';

import { PublicationEnum } from '../models/publication.enum';
import {
  PublicationParams,
  PublicationParamsPut,
  PublicationParamsScan, PublicationParamsUpdate
} from '../models/publication.interface';
import { docClient } from '../models/aws.model';

export class PublicationController {

  public uuid;
  private _docClient = docClient;

  public createPublication(req, res) {
    let Item = req.body.Item;
    this.uuid = uniqid();
    Item.publicationId = this.uuid;
    const params: PublicationParamsPut = {
      TableName: PublicationEnum.TableName,
      Item,
    };
    this._docClient.put(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public deletePublication(req: Request, res: Response) {
    const { publicationId } = req.params;
    const params: PublicationParams = {
      TableName: PublicationEnum.TableName,
      Key: {
        publicationId
      }
    };
    this._docClient.delete(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public getPublication(req: Request, res: Response) {
    const { publicationId } = req.params;
    const params: PublicationParams = {
      TableName: PublicationEnum.TableName,
      Key: {
        publicationId
      }
    };
    this._docClient.get(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public listPublications(req: Request, res: Response) {
    const params: PublicationParamsScan = {
      TableName: PublicationEnum.TableName,
      Limit: 1000,
    };
    this._docClient.scan(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }


  public updatePublication(req: Request, res: Response) {
    let UpdateExpression = [];
    let ExpressionAttributeValues = [];
    const Item = req.body.Item;
    const { publicationId } = req.params;

    keys(Item).forEach((k) => {
      UpdateExpression.push(`${k} = :${k}`);
      ExpressionAttributeValues[`:${k}`] = Item[k];
    });

    ExpressionAttributeValues[`:${PublicationEnum.TableKey}`] = publicationId;

    const params: PublicationParamsUpdate = {
      TableName: PublicationEnum.TableName,
      Key: {
        publicationId
      },
      ConditionExpression: `${PublicationEnum.TableKey} = :${PublicationEnum.TableKey}`,
      UpdateExpression: 'set ' + UpdateExpression.join(', '),
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };
    this._docClient.update(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    })
  }
}
