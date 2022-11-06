import {Construct} from "constructs";
import * as cdk from "aws-cdk-lib";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

interface DataBaseStackProps extends cdk.NestedStackProps {
    tableName: string;
    // dynamodb table olusuturulurken table name degeri main stackten alinir.
}

export class DynamodbStack extends cdk.NestedStack {
    /**
     * DynamoDB Table
     */
    public readonly table: dynamodb.Table;

    constructor(scope: Construct, id: string, props: DataBaseStackProps) {
        super(scope, id, props);

        this.table = new dynamodb.Table(this, "dynamodbtransaction", {
            // burasi mahmut beye sorulacak
            partitionKey: {
                name: "id",
                type: dynamodb.AttributeType.STRING,
            },
            tableName: props.tableName,
        });
    }
}

