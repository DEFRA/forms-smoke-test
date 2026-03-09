#!/bin/sh

DIRECTORY="$PWD/allure-report"

echo "Publishing test results to S3"

A11Y_DIRECTORY="$PWD/accessibility-reports"

if [ -n "$RESULTS_OUTPUT_S3_PATH" ]; then
   if [ -d "$DIRECTORY" ]; then
      aws s3 cp "$DIRECTORY" "$RESULTS_OUTPUT_S3_PATH" --recursive
      echo "Test results published to $RESULTS_OUTPUT_S3_PATH"
   else
      echo "$DIRECTORY is not found"
      exit 1
   fi

   if [ -d "$A11Y_DIRECTORY" ]; then
      aws s3 cp "$A11Y_DIRECTORY" "$RESULTS_OUTPUT_S3_PATH/accessibility-reports" --recursive
      echo "Accessibility reports published to $RESULTS_OUTPUT_S3_PATH/accessibility-reports"
   else
      echo "$A11Y_DIRECTORY is not found, skipping accessibility reports"
   fi
else
   echo "RESULTS_OUTPUT_S3_PATH is not set"
   exit 1
fi
