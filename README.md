# Deploy a Lambda and a S3 Bucket with the AWS CDK

### Prerequisites:
- Go
- Python
- Makefile


## Development process via Makefile

To simplify the development process and provide an ability to run tests locally we use a Makefile. A developer can execute a series of actions or execute individual steps.

* Build and validate: `make`
* Execute integration tests: `make test`
* Validate new and changed stacks with the current state: `make compare`
* Cleanup the environment: `make clean`

Check the make file for more options.
