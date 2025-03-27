# How do we write e2e tests

At this moment, we encourage using functions in `e2e/utils/common-actions.ts` to write e2e tests. This is because we want to make sure that all e2e tests are written in the same way, and we can easily maintain them in the future. Besides, we already properly added `waitFor` and `expect` functions in `common-actions.ts` to make sure that the test will behave more like a real user (wait for something to appear before interacting).

# How to run e2e testing locally

- **Note**: running the E2E tests in general, and creating test accounts specifically, can take quite some time.

## Prerequitess

- Install ruby
   ```bash
     $ rvm use 3.1.4
     $ gem install bundler
     $ bundle install
   ```
- Run `yarn install:all` in the root and example directory
- Update `example/.env` file as follows: (Contact [Chuong](chuong.nguyenvan@employmenthero.com) for getting env file)

 ```dotenv
 RUN_MOCK_SERVER=false
 IS_E2E=true
 E2E_MOCK_SERVER_PORT=<port-number>
 E2E_KEYPAY_API_URL=<keypay-test-api-url>
 E2E_KEYPAY_API_KEY=<keypay-admin-api-key>
 SWAG_PERSONAL_API_URL=http://localhost:<port-number>/mock-graphql
 SWAG_PERSONAL_NEW_API_URL=http://localhost:<port-number>/mock-new-graphql
 SWAG_PERSONAL_API_URL_ORIGINAL=<your-original-api-url>
 SWAG_PERSONAL_NEW_API_URL_ORIGINAL=<your-original-api-url>
 ```

## IOS

- Install [applesimutils](https://github.com/wix/AppleSimulatorUtils)
- Make sure that you can run `pod install` in example/ios directory
- Build app `yarn e2e:ios:build` for Mac users with M1 chips
- Write e2e scripts with command `yarn e2e:ios:test`

**Note: After finished running local E2E test, make sure to change your `example/.env` back to continue your development**



## Android

- Install Android emulator - [Android Studio](https://developer.android.com/studio) or run `cd e2e/android && ./create_emulator.sh` to create an emulator
- Install [Zulu JDK 17](https://www.azul.com/downloads/?package=jdk#zulu)
- Run `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
- Run `yarn e2e:android:build` to build the app
- Run `yarn e2e:android:test` to run the e2e tests locally
  - If you want to run a specific test file, you can run `yarn e2e:android:test e2e/specs/money/supportRequest.e2e.ts`
  - If you want to run a specific test file with a specific test case name, you can run `yarn e2e:android:test e2e/specs/money/supportRequest.e2e.ts -t 'test case name'`

# How to run e2e testing in CI (Circle CI)

## By schedule

- Automatically run the E2E test on a specific schedule by using the `Project Settings > Trigger` feature in Circle CI.
- Run at 3:00 AM VNT for iOS, 4:00 AM VNT for Android
- It will show result notification on #mobile-circle-ci-notifications slack channel

## By manual run
- Go to Circle CI and trigger the pipeline manually by Approval feature
- Every time a PR is created, the pipeline will be triggered automatically. However, the pipeline will not run the E2E test by default. The pipeline will wait for the approval from the reviewer to run the E2E test. The reviewer can approve the pipeline by clicking on the `Approve` button in the Circle CI pipeline page.

## By test path
- You can run the E2E test on a specific path by using the `e2e_test_path` parameter.
- Go to pipeline, select Trigger Pipeline, and set the parameter type to `string` and pass `e2e_test_path` as the name then set the value to the path of the test file.
    - For example, if you want to run the E2E test on the `e2e/specs/ewa/ewa-eh.e2e.ts` file, you can set the value of the `test_path` parameter to `e2e/specs/ewa/ewa-eh.e2e.ts`.
- It will show the pipeline with approval mode, you can approve it to run the E2E test for specific platform.

### FAQ

1. I encountered this error `detox[30445] ERROR: Failed to find a device by type = "iPhone 13" and by OS = "iOS 15.4"`
    - Change the device simulator suitable for your local at `.detoxrc.js`
2. How do I run a specific test files only ?
    - e.g: `yarn e2e:android:test e2e/specs/money/supportRequest.e2e.ts -t 'test case name'`
3. How to run Android test with UI mode
   - Run `headless: false, gpuMode: undefined,` in `.detoxrc.js`