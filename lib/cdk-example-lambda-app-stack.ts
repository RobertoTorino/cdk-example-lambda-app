import * as cdk from 'aws-cdk-lib';
import {
    aws_iam,
    aws_lambda,
    aws_s3,
    RemovalPolicy
} from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class CdkExampleLambdaAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const myCdkExampleLambdaAppBucket = new aws_s3.Bucket(this, 'MyCdkExampleLambdaAppBucket', {
            bucketName: 'my-cdk-example-lambda-app-bucket', // disable access control lists (ACLs) and take ownership of every object in your bucket.
            objectOwnership: aws_s3.ObjectOwnership.BUCKET_OWNER_ENFORCED, // permissions on new objects are private by default and don’t allow public access.
            blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL, encryption: aws_s3.BucketEncryption.S3_MANAGED, enforceSSL: true, versioned: true, removalPolicy: RemovalPolicy.DESTROY, // with this property set to true cdk will create and deploy a lambda and a custom resource.
            autoDeleteObjects: true,
        });
        // give the AWS account owner read access
        myCdkExampleLambdaAppBucket.grantRead(new aws_iam.AccountRootPrincipal());

        new aws_lambda.Function(this, 'MyGoLambdaFunction', {
            runtime: aws_lambda.Runtime.PROVIDED_AL2023, handler: 'main.bootstrap', code: aws_lambda.Code.fromAsset('./functions'),
        });

        new aws_lambda.Function(this, 'MyPythonLambdaFunction', {
            runtime: aws_lambda.Runtime.PYTHON_3_12, handler: 'app.lambda_handler', code: aws_lambda.Code.fromAsset('./functions'),
        });
    }
}
