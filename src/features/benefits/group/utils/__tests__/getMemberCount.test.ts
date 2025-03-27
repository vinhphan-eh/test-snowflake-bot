import { getMemberCount } from '../getMemberCount';

describe('getMemberCount', () => {
  it.each`
    memberCount      | result
    ${1}             | ${'1'}
    ${12}            | ${'10'}
    ${100}           | ${'100'}
    ${123}           | ${'100'}
    ${990}           | ${'900'}
    ${1000}          | ${'1K'}
    ${1234}          | ${'1K'}
    ${10000}         | ${'10K'}
    ${12345}         | ${'12K'}
    ${123456}        | ${'123K'}
    ${1234567}       | ${'1.2M'}
    ${1200000}       | ${'1.2M'}
    ${123400000}     | ${'123M'}
    ${1234000000}    | ${'1.2B'}
    ${12340000000}   | ${'12B'}
    ${123400000000}  | ${'123B'}
    ${1234100000000} | ${'1234B'}
  `('should render $result when memberCount is $memberCount', ({ memberCount, result }) => {
    expect(getMemberCount(memberCount)).toEqual(result);
  });
});
