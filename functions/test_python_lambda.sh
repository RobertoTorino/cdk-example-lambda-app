#!/bin/bash

# Build the templates
cd .. || exit
cdk synth --no-staging

cd functions || exit

# File path to the JSON template
template_file="../cdk.out/CdkExampleLambdaAppStack.template.json"

# Extract the logical IDs of all AWS::Lambda::Function resources
lambda_logical_ids=$(jq -r '.Resources | to_entries[] | select(.value.Type == "AWS::Lambda::Function") | .key' "$template_file")

# Convert the list of logical IDs into an array
lambda_ids_array=($lambda_logical_ids)

# Initialize a variable to hold the specific Lambda functions ID
target_lambda_id=""

# Loop through the array to find the specific Lambda functions ID
for id in "${lambda_ids_array[@]}"; do
  if [[ $id == MyPythonLambdaFunction* ]]; then
    target_lambda_id="$id"
    break
  fi
done

# Check if the target Lambda functions ID was found
if [ -z "$target_lambda_id" ]; then
  echo "Error: No target Lambda function found in the JSON file."
  echo "Possible options in your template: ${lambda_ids_array[@]}"
  exit 1
fi

# Output the target Lambda functions ID (for debugging purposes)
echo "The logical ID of the target Lambda function is: $target_lambda_id"

# Test python lambda
sam local invoke "$target_lambda_id" --no-event -t ../cdk.out/CdkExampleLambdaAppStack.template.json
