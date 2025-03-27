import { expect } from 'detox';
import jestExpect from 'expect';
import { createEmailAccount, type EtherealEmailAccount } from './create-email-account';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { SuperDashboardScreen } from '../../pom/super/SuperDashboardScreen';
import { createSwagSuperfundAccount } from '../../utils/api';
import {
  getElementById,
  getElementByLabel,
  getElementByText,
  getElementByType,
  sleep,
  typeTextById,
} from '../../utils/common-actions';
import { waitForCondition } from '../../utils/wait-for-condition';
import dayjs from 'dayjs';

const timeout = 20000;

type TestAccountInfo = { email: string; password: string; firstName: string; lastName: string };

describe('Super in Swag', () => {
  let authScreen: AuthScreen;
  let superDashboardScreen: SuperDashboardScreen;
  let testAccountInfo: TestAccountInfo;
  let emailAccount: EtherealEmailAccount;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    superDashboardScreen = new SuperDashboardScreen();
    testAccountInfo = await createSwagSuperfundAccount();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('User can submit swag superfund', async () => {
    const { email, password } = testAccountInfo;
    await authScreen.loginWith(email, password);
    await superDashboardScreen.accessSuperSection();
    await superDashboardScreen.pressLearnMoreButton();

    await (await getElementByText(`What's Super?`)).swipe('left', 'slow');
    await (await getElementByText('Super secures your future finances')).swipe('left', 'slow');
    await (await getElementByText('How can Swag help my super?')).swipe('left', 'slow');

    // Go to ActiveMembershipScreen
    await (await getElementByText(`Let's go`)).tap();

    await (await getElementByText('Spaceship', timeout)).tap();

    await expect(await getElementByText('Please confirm your details are correct')).toBeVisible();
    await expect(await getElementById('card_content_1')).toHaveText('Spaceship');
    await expect(await getElementByText('74559365913')).toBeVisible();
    await expect(await getElementByText('60905115063003')).toBeVisible();
    await expect(await getElementByText('Regulated')).toBeVisible();

    await (await getElementByText('Confirm')).tap();

    await expect(await getElementByText('Your Super is connected to Swag')).toBeVisible();

    // Test if user can see submitted swag superfund
    await device.reloadReactNative();
    await authScreen.loginWith(email, password);
    await superDashboardScreen.accessSuperSection();

    await (await getElementByText('Fund details')).tap();
    await expect(await getElementById('card_content_1')).toHaveText('Spaceship');
    await expect(await getElementByText('89898989')).toBeVisible();
    await expect(await getElementByText('74559365913')).toBeVisible();
    await expect(await getElementByText('60905115063003')).toBeVisible();
    await expect(await getElementByText('Regulated')).toBeVisible();
  });

  it('User can request salary sacrifice', async () => {
    const { email, firstName, lastName, password } = testAccountInfo;
    emailAccount = await createEmailAccount();

    await authScreen.loginWith(email, password);
    await superDashboardScreen.accessSuperSection();

    // Added this because the Salary sacrifice box push Visit our FAQs line to be out of the screen
    await (await getElementById('super-dashboard-screen')).scrollTo('bottom');
    await expect(await getElementByText('Visit our FAQs')).toBeVisible();

    await expect(await getElementByText('Boost your super with salary sacrifice', timeout)).toBeVisible();
    await superDashboardScreen.pressBoostNowButton();
    await superDashboardScreen.playWithSalarySacrificeIntroCarousel();
    await (await getElementByText('Request now')).tap();

    await expect(await getElementByText('Which income would you like to contribute from?')).toBeVisible();
    await (await getElementById('employer-item-0')).tap();

    // Select contribute an amount
    await (await getElementByText('Contribute an amount')).tap();
    await typeTextById('salary-sacrifice-dollar-amount-input', '1000.5');
    await (await getElementById('input-dollar-amount-page-title-id')).tap();

    // Press checkbox acknowledge no contribution tracking
    await (await getElementById('acknowledge-check-box')).tap();

    await sleep(1000);
    await (await getElementById('input-dollar-amount-next-button')).tap();

    // Input preseve amount
    await typeTextById('salary-sacrifice-preserve-amount-input', '150.5');
    await (await getElementById('preserve-content-text-id')).tap();

    await sleep(1000);
    await (await getElementById('preserve-next-button')).tap();

    // Select start and stop date
    await (await getElementById('salary-sacrifice-end-date-input')).tap();
    if (device.getPlatform() === 'ios') {
      await (await getElementByType('RNDateTimePicker')).swipe('up', 'slow', 0.1, 0.1);
      await (await getElementByLabel('Confirm')).tap();
    } else {
      const formattedDate = dayjs().add(2, 'day').format('YYYY/MM/DD');
      const datePicker = element(by.type('android.widget.DatePicker'));
      await datePicker.setDatePickerDate(formattedDate, 'yyyy/MM/dd');
      await (await getElementByText('OK')).tap();
    }

    // Go to review screen
    await (await getElementById('start-and-stop-contribution-next-button')).tap();
    await expect(await getElementByText('Please confirm these details are correct')).toBeVisible();

    await expect(await getElementByText('$1,000.50')).toBeVisible();
    await expect(await getElementByText('$150.50')).toBeVisible();

    // Edit contribution screen
    await (await getElementById('salary-sacrifice-contribution-data-card')).tap();
    await sleep(1000);

    await typeTextById('edit-contribution-value-input', '550000.55');
    await typeTextById('edit-preserve-amount-input', '5500.5');
    await (await getElementByText('Salary sacrifice request details')).tap();

    await sleep(1000);

    await (await getElementByText('Save')).tap();
    await expect(await getElementByText('$550,000.55')).toBeVisible();
    await expect(await getElementByText('$5,500.50')).toBeVisible();

    // Edit again
    await (await getElementById('salary-sacrifice-contribution-data-card')).tap();
    await sleep(1000);

    await typeTextById('edit-contribution-value-input', '100000.5');
    await typeTextById('edit-preserve-amount-input', '1500.5');
    await (await getElementByText('Salary sacrifice request details')).tap();

    await sleep(1000);
    await (await getElementByText('Save')).tap();
    await expect(await getElementByText('$100,000.50')).toBeVisible();
    await expect(await getElementByText('$1,500.50')).toBeVisible();

    await (await getElementByText('Confirm')).tap();
    await sleep(5000);
    await expect(await getElementById('submit-contribution-success-message-id')).toBeVisible();

    // Should render fund details and manage contributions tile
    await (await getElementByText('Done')).tap();
    await (await getElementById('super-dashboard-screen')).scrollTo('top');

    // Test if user can see submitted contribution
    await expect(await getElementByText('Fund details')).toBeVisible();
    await expect(await getElementByText('Salary sacrifice')).toBeVisible();

    // Press manage contributions
    await (await getElementById('manage-contributions-pressable')).tap();
    await (await getElementById('pending-tab')).tap();

    await expect(await getElementByText('$100,000.50')).toBeVisible();
    await expect(await getElementByText('$1,500.50')).toBeVisible();

    const isSalarySacrificeEmailSent = await waitForCondition(
      async () => {
        const emails = await emailAccount.getEmails([
          ['SUBJECT', `${firstName} ${lastName}, Salary Sacrifice Request`],
        ]);
        const totalEmails = emails.length;

        // Verify that exactly 1 email is sent
        if (totalEmails === 1) {
          // Verify the email subject is exactly correct
          const header = emails[0].parts?.[0]?.body;
          if (header?.subject?.[0] === `${firstName} ${lastName}, Salary Sacrifice Request`) {
            return true;
          }
        }
        return false;
      },
      5000,
      200
    );

    jestExpect(isSalarySacrificeEmailSent).toBeTruthy();

    // Close IMAP connection after finish test
    emailAccount.closeConnection();
  });

  it('User can request supported super consolidation', async () => {
    const { email, password } = testAccountInfo;
    await authScreen.loginWith(email, password);
    await superDashboardScreen.accessSuperSection();

    await (await getElementById('super-dashboard-screen')).scrollTo('bottom');

    await superDashboardScreen.pressFindOutNowButton();
    await superDashboardScreen.playWithSuperConsolidationIntroCarousel();
    await (await getElementByText(`Let's go!`)).tap();
    await (await getElementByText('Find your lost super')).tap();
  });

  it('User can see supported consolidation after requested', async () => {
    const { email, password } = testAccountInfo;
    await authScreen.loginWith(email, password);
    await superDashboardScreen.accessSuperSection();
    await (await getElementById('super-dashboard-screen')).scrollTo('bottom');
    await (await getElementByText('Track your progress')).tap();
    await expect(await getElementById('card_content_1')).toHaveText('Spaceship');
    await (await getElementByText('Visit fund website')).tap();
  });
});
