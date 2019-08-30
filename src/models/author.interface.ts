export interface AuthorParams {
  TableName: string;
  Key: AuthorItem;
}

export interface AuthorParamsPut {
  TableName: string;
  Item: AuthorItem;
}

export interface AuthorParamsScan {
  TableName: string;
  Limit: number;
}

export interface AuthorParamsUpdate {
  TableName: string;
  Key: AuthorItem;
  ConditionExpression: string;
  UpdateExpression: string;
  ExpressionAttributeValues: string[];
  ReturnValues: string;
}

export interface AuthorItem {
  authorId: string;
  birthDate?: string;
  email?: string;
  authorName?: string;
}
