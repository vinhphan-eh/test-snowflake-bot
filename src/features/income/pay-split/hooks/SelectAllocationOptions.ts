/* eslint-disable no-bitwise */

// Enablement flags
export const PS_ENABLED_ALL_MY_PAY = 1 << 0;
export const PS_ENABLED_PERCENTAGE = 1 << 1;
export const PS_ENABLED_DOLLAR = 1 << 2;

export class SelectAllocationOptions {
  constructor(public mask: number) {}

  // eslint-disable-next-line no-bitwise
  private check = (bit: number) => !!(this.mask & bit);

  isAllMyPayEnabled = () => this.check(PS_ENABLED_ALL_MY_PAY);

  isPercentageEnabled = () => this.check(PS_ENABLED_PERCENTAGE);

  isDollarEnabled = () => this.check(PS_ENABLED_DOLLAR);
}
