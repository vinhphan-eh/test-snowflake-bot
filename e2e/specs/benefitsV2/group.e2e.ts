import { expect } from 'detox';
import { AuthScreen } from '../../pom/auth/AuthScreen';
import { GroupDetailScreen } from '../../pom/benefits/group/GroupDetailScreen';
import { createRandomUser } from '../../utils/api';
import { getElementByText } from '../../utils/common-actions';

describe('Megadeal Group', () => {
  let authScreen: AuthScreen;
  let groupDetailScreen: GroupDetailScreen;

  beforeAll(async () => {
    authScreen = new AuthScreen();
    groupDetailScreen = new GroupDetailScreen();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('User can join a group', async () => {
    const { email, password } = await createRandomUser();
    await authScreen.loginWith(email, password, {
      pillar: 'benefits',
    });
    await groupDetailScreen.pickSupportCountryInBenefits();

    await groupDetailScreen.goToGroupDetail();

    await groupDetailScreen.joinGroup();
    await expect(await getElementByText('Welcome to our group!')).toBeVisible();
    await (await getElementByText('Continue')).tap();
    await expect(await getElementByText('Invite others')).toBeVisible();
  });
});
