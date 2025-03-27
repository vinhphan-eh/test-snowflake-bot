import { formatContributionAmount } from '../formatContributionAmount';

describe('formatContributionAmount', () => {
  it.each`
    type            | value       | result
    ${'FIXED'}      | ${'100'}    | ${'$100.00'}
    ${'FIXED'}      | ${'100000'} | ${'$100,000.00'}
    ${'PERCENTAGE'} | ${'90'}     | ${'90%'}
    ${'PERCENTAGE'} | ${'10.5'}   | ${'10.5%'}
    ${''}           | ${'10.5'}   | ${'10.5%'}
  `('should render correctly when type is $type and value is $value', ({ result, type, value }) => {
    expect(formatContributionAmount(type, value)).toEqual(result);
  });
});
