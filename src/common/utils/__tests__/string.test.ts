import { capitalize, humanize } from '../string';

describe('humanize', () => {
  it('should humanize string properly', () => {
    expect(humanize('sample_text')).toEqual('sample text');
    expect(humanize('sample-__-_text')).toEqual('sample text');
    expect(humanize('sample_text-string')).toBe('sample text string');
    expect(humanize('sample_text_string')).toBe('sample text string');
    expect(humanize('sample text string')).toBe('sample text string');
  });
  it('trims the resulting string', () => {
    expect(humanize('  sample_text-string  ')).toBe('sample text string');
  });
});

describe('capitalize', () => {
  it('should capitalize string properly', () => {
    expect(capitalize('sample')).toEqual('Sample');
    expect(capitalize('SAMPLE')).toEqual('Sample');
    expect(capitalize('sample string')).toEqual('Sample string');
  });
});
