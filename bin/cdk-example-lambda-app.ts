#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {
    CdkExampleLambdaAppStack
} from '../lib/cdk-example-lambda-app-stack';
import {
    addTags,
    Environment
} from '../lib/shared';

export const env = {
    account: process.env.CDK_SYNTH_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_SYNTH_REGION || process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
const cdkExampleLambdaApp = new CdkExampleLambdaAppStack(app, 'CdkExampleLambdaAppStack', {
    stackName: 'CdkExampleLambdaAppStack', description: 'Example stack.', env,
});
addTags(cdkExampleLambdaApp, Environment.dev);

app.synth();
