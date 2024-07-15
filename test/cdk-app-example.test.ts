import { App } from 'aws-cdk-lib';
import { env } from '../bin/cdk-example-lambda-app';
import { CdkAppExampleStack } from '../lib/cdk-example-lambda-app-stack';


describe("Synthesize tests", () => {
    const app = new App();

    test("Creates the stack without exceptions", () => {
        expect(() => {
            new CdkAppExampleStack(app, "CdkAppExampleStack", {
                description: "CdkAppExampleStack",
                env,
            });
        }).not.toThrow();
    });

    test("This app can synthesize completely", () => {
        expect(() => {
            app.synth();
        }).not.toThrow();
    });
});
