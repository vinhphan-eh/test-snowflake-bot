import { bin } from '../animations';

describe('animations', () => {
  it('bin() works correct', () => {
    expect(bin(true)).toBe(1);
    expect(bin(false)).toBe(0);
  });
});
