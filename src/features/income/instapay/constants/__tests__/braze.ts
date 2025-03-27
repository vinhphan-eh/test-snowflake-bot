import { getPopupIdByFeature } from '../braze';

describe('getPopupIdByFeature', () => {
  it.each`
    feature       | hasZeroBalance | expected
    ${'rosters'}  | ${false}       | ${'instapay_exp_popup_roster'}
    ${'payslips'} | ${false}       | ${'instapay_exp_popup'}
    ${'rosters'}  | ${true}        | ${'instapay_exp_popup_roster_zero_balance'}
    ${'payslips'} | ${true}        | ${'instapay_exp_popup_zero_balance'}
  `(
    'should return $expected when feature is $feature and hasZeroBalance is $hasZeroBalance',
    ({ expected, feature, hasZeroBalance }) => {
      expect(getPopupIdByFeature(feature, hasZeroBalance)).toBe(expected);
    }
  );
});
