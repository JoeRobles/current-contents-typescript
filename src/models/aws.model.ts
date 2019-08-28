import * as AWS from 'aws-sdk';
import { AwsCredentials } from '../config/aws.credentials';

AWS.config.update({
  credentials: new AWS.Credentials(
    AwsCredentials.ACCESS_KEY_ID,
    AwsCredentials.SECRET_KEY
  ),
  region: AwsCredentials.REGION,
});

new AWS.S3({ apiVersion: '2016-11-07' });
export const docClient = new AWS.DynamoDB.DocumentClient();
