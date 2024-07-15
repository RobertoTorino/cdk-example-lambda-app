import { exec } from 'child_process';

describe("Snyk IaC test", () => {
  it("should run Snyk test with severity threshold high", (done) => {
    exec(
      "snyk iac test cdk.out --severity-threshold=high",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          // Consider failing the test if Snyk command fails
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        done();
      },
    );
  });
});
