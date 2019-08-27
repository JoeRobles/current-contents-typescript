export interface AuthorParams {
  TableName: string;
  Key: AuthorKey;
}

export interface AuthorParamsPut {
  TableName: string;
  Item: AuthorKey;
}

export interface AuthorParamsScan {
  TableName: string;
  Limit: number;
}

export interface AuthorParamsUpdate {
  TableName: string;
  Key: AuthorKey;
  ConditionExpression: string;
  UpdateExpression: string;
  ExpressionAttributeValues: string[];
  ReturnValues: string;
}

interface AuthorKey {
  authorId: string;
  birthDate?: string;
  email?: string;
  authorName?: string;
}
