export interface PublicationParams {
  TableName: string;
  Key: PublicationKey;
}

export interface PublicationParamsPut {
  TableName: string;
  Item: PublicationKey;
}

export interface PublicationParamsScan {
  TableName: string;
  Limit: number;
}

export interface PublicationParamsUpdate {
  TableName: string;
  Key: PublicationKey;
  ConditionExpression: string;
  UpdateExpression: string;
  ExpressionAttributeValues: string[];
  ReturnValues: string;
}

interface PublicationKey {
  publicationId: string;
  title?: string;
  publicationDate?: string;
  body?: string;
}
