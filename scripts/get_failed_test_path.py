import json
import argparse
import traceback
import sys
import re
import glob
from typing import List

# Handle Parameters

parser = argparse.ArgumentParser(
                    prog='Report failed tests',
                    description='Report failed tests')

parser.add_argument('--runner-working-dir', '-rwd', type=str, required=True)
parser.add_argument('--artifacts-path','-ap', type=str, required=True)

RUNNER_WORKING_DIR = parser.parse_args().runner_working_dir
ARTIFACTS_PATH = parser.parse_args().artifacts_path
RESULT_FILE_NAME = "results.json"


def parse_failures(test_results: List[str]):
    failed_tests = []
    for test_result in test_results:
        json_file = open(test_result, 'r').read()
        test_result = json.loads(json_file)
        tests = test_result['results']['tests']
        for test in tests:
            if test['status'] == 'failed':
                # Extract specific fields
                failed_test_info = {
                    'file_path': replace_test_path(test['filePath'], ''),
                }
                # Add to the list of failed tests
                failed_tests.append(failed_test_info)
    return failed_tests


def replace_test_path(path, replacement):
    pattern = f"{RUNNER_WORKING_DIR}/"
    path = re.sub(pattern, replacement, path)
    return path


def list_test_results(dir):
    path = f"{dir}/**/{RESULT_FILE_NAME}"
    test_results = glob.glob(path, recursive=True)
    return test_results

try:
    test_results = list_test_results(ARTIFACTS_PATH)
    failed_tests = parse_failures(test_results)

    # Extract file paths
    file_paths = [test['file_path'] for test in failed_tests]

    # Remove duplicates
    unique_file_paths = list(set(file_paths))

    # Convert unique file paths to a comma-separated string
    unique_file_paths_str = ','.join(unique_file_paths)

    # Print or return the result
    print(unique_file_paths_str)


except Exception:
    print(traceback.format_exc())
    print(sys.exc_info()[2])
