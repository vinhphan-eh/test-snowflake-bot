import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../../utils/testing';
import PageTitle from '../PageTitle';

describe('PageTitle', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PageTitle>Some title</PageTitle>);
    expect(getByText('Some title')).toBeDefined();
  });

  it('renders nested text correctly', () => {
    const { getByText } = render(
      <PageTitle>
        Some title with{' '}
        <Typography.Body variant="small" style={{ textDecorationLine: 'underline' }}>
          Nested Text
        </Typography.Body>
      </PageTitle>
    );
    expect(getByText('Some title with', { exact: false })).toBeDefined();
    expect(getByText('Nested Text', { exact: false })).toBeDefined();
  });
});
