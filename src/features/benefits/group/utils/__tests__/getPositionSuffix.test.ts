import { getPositionSuffix } from '../getPositionSuffix';

describe('getPositionSuffix', () => {
  it.each`
    position   | result
    ${1}       | ${'st'}
    ${2}       | ${'nd'}
    ${3}       | ${'rd'}
    ${4}       | ${'th'}
    ${7}       | ${'th'}
    ${10}      | ${'th'}
    ${11}      | ${'th'}
    ${12}      | ${'th'}
    ${13}      | ${'th'}
    ${14}      | ${'th'}
    ${20}      | ${'th'}
    ${21}      | ${'st'}
    ${200}     | ${'th'}
    ${212}     | ${'th'}
    ${1234}    | ${'th'}
    ${12341}   | ${'st'}
    ${12345}   | ${'th'}
    ${123452}  | ${'nd'}
    ${1234563} | ${'rd'}
  `('should render $position$result when position is $position', ({ position, result }) => {
    expect(getPositionSuffix(position)).toEqual(result);
  });
});
