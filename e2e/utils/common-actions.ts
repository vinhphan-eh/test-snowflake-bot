import { waitFor, element, by } from 'detox';
import type { BenefitsTabKeysType } from '../../src/features/benefits/common/hooks/useBenefitsTabs/constants';
import type { TabKeysType } from '../../src/navigation/TopTabsNavigator';

const TIMEOUT = 10 * 1000;

export const getElementByText = async (value: string | RegExp, timeout = TIMEOUT) => {
  await waitFor(element(by.text(value)))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.text(value));
};

export const getElementByTextWithIndex = async ({
  value,
  timeout = TIMEOUT,
  index = 0,
}: {
  value: string;
  timeout?: number;
  index?: number;
}) => {
  await waitFor(element(by.text(value)).atIndex(index))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.text(value)).atIndex(index);
};

export const getElementById = async (value: string, timeout = TIMEOUT) => {
  await waitFor(element(by.id(value)))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.id(value));
};

export const getElementByIdWithIndex = async ({
  value,
  timeout = TIMEOUT,
  index = 0,
}: {
  value: string;
  timeout?: number;
  index?: number;
}) => {
  await waitFor(element(by.id(value)).atIndex(index))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.id(value)).atIndex(index);
};

export const getElementByLabel = async (
  value: string | RegExp,
  timeout = TIMEOUT
): Promise<Detox.IndexableNativeElement> => {
  await waitFor(element(by.label(value)))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.label(value));
};

export const getElementByLabelWithIndex = async ({
  value,
  timeout = TIMEOUT,
  index = 0,
}: {
  value: string | RegExp;
  timeout?: number;
  index?: number;
}) => {
  await waitFor(element(by.label(value)).atIndex(index))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.label(value)).atIndex(index);
};

export const getElementByType = async (value: string, timeout = TIMEOUT): Promise<Detox.IndexableNativeElement> => {
  await waitFor(element(by.type(value)))
    .toBeVisible()
    .withTimeout(timeout);
  return element(by.type(value));
};

export const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const getElementByIdIfExisted = async (
  id: string,
  callback: (element: Detox.IndexableNativeElement) => void
) => {
  try {
    await getElementById(id, 15000);
    await callback(await getElementById(id));
  } catch (err) {
    console.log(`Element ${id} is not visible. Continuing execution...`);
  }
};

export const getTextInputById = (id: string) => {
  if (device.getPlatform() === 'ios') {
    // add tap before replace text (make sure the element is ready for edit)
    return element(by.id(id));
  }
  return element(by.type('android.widget.EditText').withAncestor(by.id(id)));
};

export const typeTextById = async (id: string, text: string) => {
  const input =
    device.getPlatform() === 'ios'
      ? element(by.id(id))
      : element(by.type('android.widget.EditText').withAncestor(by.id(id)));
  await input.tap();
  await input.replaceText(text);
};

export const typeTextByIdAndReturn = async (id: string, text: string) => {
  const input =
    device.getPlatform() === 'ios'
      ? element(by.id(id))
      : element(by.type('android.widget.EditText').withAncestor(by.id(id)));
  await input.tap();
  await input.replaceText(text);
  await input.tapReturnKey();
};

export const tapByText = async (text: string) => {
  if (device.getPlatform() === 'ios') {
    await (await getElementByLabel(text)).tap();
  } else {
    await (await getElementByLabelWithIndex({ value: text, index: 1 })).tap();
  }
};

export const inputNumberOnAndroid = async (elementId: string, value: string) => {
  const inputEl = element(by.type('android.widget.EditText').withAncestor(by.id(elementId)));
  await inputEl.tap();
  // Android doesn't have return key, so we need to type the amount and tap the next button
  await inputEl.typeText(`${value.toString()}\n`);
};

export const backToBenefitsPillar = async (tab?: BenefitsTabKeysType) => {
  await device.openURL({ url: `swagpersonalappexample://benefits/${tab || ''}` });
};

export const backToMoneyPillar = async (tab?: TabKeysType) => {
  await device.openURL({ url: `swagpersonalappexample://wallet/${tab || ''}` });
};

export async function checkIfNotVisible(elementId: string | RegExp, timeout = TIMEOUT) {
  return waitFor(element(by.id(elementId)))
    .not.toBeVisible()
    .withTimeout(timeout);
}

export async function checkTextIfNotVisible(text: string | RegExp, timeout = TIMEOUT) {
  return waitFor(element(by.text(text)))
    .not.toBeVisible()
    .withTimeout(timeout);
}

export const adjustSlider = async (id: string, expectedPosition: number) => {
  const slider = await getElementById(id);

  // https://github.com/callstack/react-native-slider/issues/351
  // set it to 0 first to avoid the issue
  await slider.adjustSliderToPosition(0);
  await slider.swipe('right', 'slow', expectedPosition, 0);
};
