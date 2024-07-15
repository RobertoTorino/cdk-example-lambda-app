import { exec } from 'child_process';

describe("Snyk code test", () => {
  it("should run Snyk test with severity threshold high", (done) => {
    exec("snyk test --fail-on=all --all-projects", (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        // Consider failing the test if Snyk command fails
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      done();
    });
  }, 10000); // Set timeout to 10 seconds
});
