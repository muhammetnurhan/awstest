import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import {Construct} from 'constructs';

interface ApiGatewayStackProps extends cdk.NestedStackProps {
    apiName: string;
    apiDescription: string;
    apiResourceName: string;
    apiResourceDescription: string;

}

export class ApiGatewayStack extends cdk.NestedStack {
    /**
     * Api Gateway
     */
    public readonly api: apigateway.RestApi;

    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        this.api = new apigateway.RestApi(this, props.apiName, {
            restApiName: props.apiName,
            description: props.apiDescription,
        });

        const resource = this.api.root.addResource(props.apiResourceName, {
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });

        resource.addMethod('GET');
    }
}

//
// export class ApiGatewayStack extends cdk.NestedStack {
//     constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
//         super(scope, id, props);
//
//         const api = new apigateway.RestApi(this, 'transaction-mail-api', {});
//         const content = api.root.addResource('content');
//         content.addMethod('GET');
//     }
// }