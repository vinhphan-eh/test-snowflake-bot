import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../../utils/testing';
import PageTopBar from '../PageTopBar';

describe('PageTopBar', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<PageTopBar title="Agreement" />);

    expect(getByText('Agreement')).toBeDefined();
    expect(getByTestId('topbar-back-icon')).toBeDefined();
    expect(getByTestId('topbar-right-icon')).toBeDefined();
  });

  it('can hide left action', () => {
    const { getByTestId, getByText, queryByTestId } = render(<PageTopBar title="Agreement" hideLeft />);

    expect(getByText('Agreement')).toBeDefined();
    expect(queryByTestId('topbar-back-icon')).toBeNull();
    expect(getByTestId('topbar-right-icon')).not.toBeNull();
  });

  it('can hide right action', () => {
    const { getByTestId, getByText, queryByTestId } = render(<PageTopBar title="Agreement" hideRight />);

    expect(getByText('Agreement')).toBeDefined();
    expect(getByTestId('topbar-back-icon')).not.toBeNull();
    expect(queryByTestId('topbar-right-icon')).toBeNull();
  });

  it('can hide title', () => {
    const { getByTestId, queryByText } = render(<PageTopBar />);

    expect(queryByText('Agreement')).toBeNull();
    expect(getByTestId('topbar-back-icon')).not.toBeNull();
    expect(getByTestId('topbar-right-icon')).not.toBeNull();
  });

  it('can replace title with children', () => {
    const { getByTestId, getByText, queryByText } = render(
      <PageTopBar title="Agreement">
        <Typography.Body variant="small">New Title</Typography.Body>
      </PageTopBar>
    );

    expect(getByText('New Title')).toBeDefined();
    expect(queryByText('Agreement')).toBeNull();
    expect(getByTestId('topbar-back-icon')).not.toBeNull();
    expect(getByTestId('topbar-right-icon')).not.toBeNull();
  });

  it('can replace back icon with customLeft', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <PageTopBar
        title="Agreement"
        customLeft={() => <Typography.Body variant="small">New Left Action</Typography.Body>}
      />
    );

    expect(getByText('Agreement')).toBeDefined();
    expect(getByText('New Left Action')).toBeDefined();
    expect(queryByTestId('topbar-back-icon')).toBeNull();
    expect(getByTestId('topbar-right-icon')).not.toBeNull();
  });

  it('can replace dismiss icon with customRight', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <PageTopBar
        title="Agreement"
        customRight={() => <Typography.Body variant="small">New Right Action</Typography.Body>}
      />
    );

    expect(getByText('Agreement')).toBeDefined();
    expect(getByText('New Right Action')).toBeDefined();
    expect(getByTestId('topbar-back-icon')).not.toBeNull();
    expect(queryByTestId('topbar-right-icon')).toBeNull();
  });
});
