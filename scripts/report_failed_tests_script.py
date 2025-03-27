import os
import json
import ruamel.yaml
import argparse
import traceback
import sys
import re
import glob
from typing import List
from codeowners import CodeOwners
from pathlib import Path
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError


# Handle Parameters

parser = argparse.ArgumentParser(
                    prog='Report failed tests',
                    description='Report failed tests')

parser.add_argument('--codeowners', '-c', type=str, required=True)
parser.add_argument('--workflow', '-w', type=str, required=False)
parser.add_argument('--author', '-a', type=str, required=False)
parser.add_argument('--runner-working-dir', '-rwd', type=str, required=True)
parser.add_argument('--artifacts-path','-ap', type=str, required=True)
parser.add_argument('--job-name', '-jname', type=str, required=True)
parser.add_argument('--workflow-run-url', '-wurl', type=str, required=True)

CODE_OWNERS_FILE = parser.parse_args().codeowners
WORKFLOW_NAME = parser.parse_args().workflow
JOB_NAME = parser.parse_args().job_name
WORKFLOW_RUN_URL = parser.parse_args().workflow_run_url
AUTHOR = parser.parse_args().author
RUNNER_WORKING_DIR = parser.parse_args().runner_working_dir
ARTIFACTS_PATH = parser.parse_args().artifacts_path
RESULT_FILE_NAME = "results.json"

# Configuration
SLACK_API_TOKEN = os.environ.get('SLACK_API_TOKEN')
CIRCLECI_TOKEN=  os.environ.get('CIRCLECI_TOKEN')
SLACK_DEFAULT_CHANNEL = os.environ.get('SLACK_DEFAULT_CHANNEL')

VCS_TYPE = 'github'
ORG_NAME = 'Thinkei'
REPO_NAME = 'ebf-swag-personal'


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
                    'name': test['name'],
                    'file_path': replace_test_path(test['filePath'], ''),
                    'trace': test['trace'],
                    'owner': None,
                    'slack_id': None
                }
                # Add to the list of failed tests
                failed_tests.append(failed_test_info)
    return failed_tests

def replace_test_path(path, replacement):
    pattern = f"{RUNNER_WORKING_DIR}/"
    path = re.sub(pattern, replacement, path)
    return path

def get_code_owner_from_failed_tests(failed_tests):
    with open(CODE_OWNERS_FILE, "r") as f:
        codeowners = f.read()
        print(codeowners)
        group_test = []
        owners = CodeOwners(codeowners)
        for test in failed_tests:
            file_onwers = owners.of(test['file_path'])
            if not file_onwers:
                continue
            test['owner'] = file_onwers[0][1]
            owner_name = file_onwers[0][1].replace("@Thinkei/", "")
            test['slack_id'] = find_slack_id(owner_name)
            group_test.append(test)
        return group_test

def find_slack_id(team_name):
    teams = read_teams_file()
    for team in teams:
        if team['github'] == team_name:
            return team['slack_id']
    return None

def read_teams_file():
    yaml = ruamel.yaml.YAML()
    teams_file_path = Path("teams.yaml")
    teams = yaml.load(teams_file_path)
    return teams

def group_by_owner(test_data):
    grouped_by_slack_id = {}
    for item in test_data:
        slack_id = item['slack_id']
        if slack_id not in grouped_by_slack_id:
            grouped_by_slack_id[slack_id] = []
        grouped_by_slack_id[slack_id].append(item)
    return grouped_by_slack_id



def send_slack_message(message, title, color , channel):
    slack_client = WebClient(token=SLACK_API_TOKEN)
    try:
        init_attachment = [
            {
                "mrkdwn_in": ["text"],
                "color": color,
                "fields": [
                    {
                        "title": title + '\n',
                        "value": message,
                        "short": False
                    }
                ]
            }
        ]
        r = slack_client.chat_postMessage(
            channel = channel,
            attachments = init_attachment,
            text = "eBen Swag E2E test notification" ,
            icon_emoji = ':strawberry:',
            username = 'StrawberryBot',
        )
    except SlackApiError as e:
        # Handle errors gracefully, e.g., log the error or send to an alternative channel
        print(f"Error sending message: {e}")


def build_slack_message(grouped_data):
    slack_message = ":zap: *Workflow name: * " + str(WORKFLOW_NAME) + ' \n'
    slack_message = slack_message + ":information_source: *Job Name: * " + str(JOB_NAME) + ' \n'
    slack_message = slack_message + ":information_source: *Workflow run: * " + str(WORKFLOW_RUN_URL) +  ' \n'
    slack_message = slack_message + ":run: *Triggered by* " + str(AUTHOR) + ' \n'
    slack_message = slack_message + ":smoke: *Failed cases by team as below* " + ' \n' + ' \n'
    for slack_id, tests in grouped_data.items():
        slack_message = slack_message + "<!subteam^" +f"{slack_id}>:" + ' \n'
        for test in tests:
            slack_message = slack_message + f" {test['name']}" + ' \n'
    print(slack_message)
    return slack_message


def find_line_column(input_string, file_path):
    # Regular expression to find the line and column number after the specific file path
    pattern = re.compile(re.escape(file_path) + r':(\d+):(\d+)')
    match = pattern.search(input_string)
    if match:
        line, column = match.groups()
        return f"{line}:{column}"
    return None

def list_test_results(dir):
    path = f"{dir}/**/{RESULT_FILE_NAME}"
    print(path)

    test_results = glob.glob(path, recursive=True)
    print(test_results)
    return test_results

try:
    test_results = list_test_results(ARTIFACTS_PATH)
    failed_tests = parse_failures(test_results)
    # print(f"Failed Tests: {failed_tests}")
    if failed_tests:
        group_test = get_code_owner_from_failed_tests(failed_tests)
        grouped_data = group_by_owner(group_test)
        slack_message = build_slack_message(grouped_data)
        # print(slack_message)
        failed_color = '#FE015A'
        send_slack_message(slack_message, "eBen Failed Test Results", failed_color, SLACK_DEFAULT_CHANNEL)
    else:
        # Prevent pipeline from failing not by test script
        print("No failed tests found")

except Exception:
    print(traceback.format_exc())
    print(sys.exc_info()[2])
