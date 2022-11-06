import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {DynamodbStack} from './stack/dynamodb-stack';
import {LambdaFunction} from './stack/lambda-stack';
import {ApiGatewayStack} from './stack/api-gateway-stack';


export class TransactionMailStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // bi kisim sorulacak
        const databaseStack = new DynamodbStack(this, 'Dynamodb', {
            tableName: 'transaction-mail',
        });
        // bi kisim sorulacak
        const apiGatewayStack = new ApiGatewayStack(this, 'ApiGateway', {
            apiName: 'transaction-mail-api',
            apiDescription: 'transaction-mail-api',
            apiResourceName: 'content',
            apiResourceDescription: 'content',
        });
        const contentlambdaStack = new LambdaFunction(this, 'ContentLambda', {
            lambdaName: 'transaction-mail-content',
            filename: 'content-lambda.ts',
            handler: 'index.handler',
        });
        const sendlambdaStack = new LambdaFunction(this, 'SendLambda', {
            lambdaName: 'transaction-mail-send',
            filename: 'send-lambda.ts',
            handler: 'index.handler',
        });

    }
}
