export interface PublicationParams {
  TableName: string;
  Key: PublicationItem;
}

export interface PublicationParamsPut {
  TableName: string;
  Item: PublicationItem;
}

export interface PublicationParamsScan {
  TableName: string;
  Limit: number;
}

export interface PublicationParamsUpdate {
  TableName: string;
  Key: PublicationItem;
  ConditionExpression: string;
  UpdateExpression: string;
  ExpressionAttributeValues: string[];
  ReturnValues: string;
}

export interface PublicationItem {
  publicationId: string;
  title?: string;
  publicationDate?: string;
  body?: string;
}
