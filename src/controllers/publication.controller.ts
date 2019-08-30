import { keys } from 'lodash';
import * as uniqid from 'uniqid';

import { PublicationEnum } from '../models/publication.enum';
import {
  PublicationParams,
  PublicationParamsPut,
  PublicationParamsScan,
  PublicationParamsUpdate
} from '../models/publication.interface';
import { docClient } from '../models/aws.model';

export class PublicationController {

  public uuid;
  private _docClient = docClient;
  private Limit: number = PublicationEnum.Limit;
  private TableName: string = PublicationEnum.TableName;

  public createPublication(req, res): void {
    let Item = req.body.Item;
    this.uuid = uniqid();
    Item.publicationId = this.uuid;
    const params: PublicationParamsPut = {
      TableName: this.TableName,
      Item,
    };
    this._docClient.put(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public deletePublication(req, res): void {
    const { publicationId } = req.params,
    params: PublicationParams = {
      TableName: this.TableName,
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

  public getPublication(req, res): void {
    const { publicationId } = req.params,
    params: PublicationParams = {
      TableName: this.TableName,
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

  public listPublications(req, res): void {
    const params: PublicationParamsScan = {
      TableName: this.TableName,
      Limit: this.Limit,
    };
    this._docClient.scan(params, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }


  public updatePublication(req, res): void {
    let UpdateExpression = [], ExpressionAttributeValues = [];
    const Item = req.body.Item, { publicationId } = req.params;

    keys(Item).forEach((k) => {
      UpdateExpression.push(`${k} = :${k}`);
      ExpressionAttributeValues[`:${k}`] = Item[k];
    });

    ExpressionAttributeValues[`:${PublicationEnum.TableKey}`] = publicationId;

    const params: PublicationParamsUpdate = {
      TableName: this.TableName,
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
