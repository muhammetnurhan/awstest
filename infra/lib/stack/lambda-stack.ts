import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as path from 'path';
import {RetentionDays} from "aws-cdk-lib/aws-logs";

interface LambdaStackProps extends cdk.NestedStackProps {
    lambdaName: string;
    filename: string;
    handler?: string;
}

export class LambdaFunction extends cdk.NestedStack {
    /**
     * Lambda Function
     */
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);
        const lambdaPath = path.join(__dirname, `../../../app/${props.filename}`);

        new lambda.Function(this, props.lambdaName, {
            functionName: props.lambdaName,
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.AssetCode.fromInline(lambdaPath),
            handler: props.handler || 'index.handler',
            logRetention: RetentionDays.ONE_DAY,

        });
    }
}
