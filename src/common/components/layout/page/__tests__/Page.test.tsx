import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../../utils/testing';
import Page from '../Page';

describe('Page', () => {
  it('renders correctly with shorthand', () => {
    const { getByText } = render(
      <Page
        title="This is page title"
        body={() => <Typography.Body variant="small">Body Content</Typography.Body>}
        footer={() => <Typography.Body variant="small">Footer Content</Typography.Body>}
      />
    );
    expect(getByText('This is page title')).toBeDefined();
    expect(getByText('Body Content')).toBeDefined();
    expect(getByText('Footer Content')).toBeDefined();
  });

  it('children will replace all shorthand', () => {
    const { queryByText } = render(
      <Page
        title="This is page title"
        body={() => <Typography.Body variant="small">Body Content</Typography.Body>}
        footer={() => <Typography.Body variant="small">Footer Content</Typography.Body>}
      >
        <Typography.Body variant="small">Children</Typography.Body>
      </Page>
    );
    expect(queryByText('Children')).not.toBeNull();

    expect(queryByText('This is page title')).toBeNull();
    expect(queryByText('Body Content')).toBeNull();
    expect(queryByText('Footer Content')).toBeNull();
  });

  it('renders correctly with JSX childrens', () => {
    const { getByText } = render(
      <Page>
        <Page.Title>This is page title</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">Body Content</Typography.Body>
        </Page.Body>
        <Page.Footer>
          <Typography.Body variant="small">Footer Content</Typography.Body>
        </Page.Footer>
      </Page>
    );
    expect(getByText('This is page title')).toBeDefined();
    expect(getByText('Body Content')).toBeDefined();
    expect(getByText('Footer Content')).toBeDefined();
  });

  it('still works correctly without title', () => {
    const { getByText } = render(
      <Page>
        <Page.Body>
          <Typography.Body variant="small">Body Content</Typography.Body>
        </Page.Body>
        <Page.Footer>
          <Typography.Body variant="small">Footer Content</Typography.Body>
        </Page.Footer>
      </Page>
    );
    expect(getByText('Body Content')).toBeDefined();
    expect(getByText('Footer Content')).toBeDefined();
  });

  it('still works correctly without body', () => {
    const { getByText } = render(
      <Page>
        <Page.Title>This is page title</Page.Title>

        <Page.Footer>
          <Typography.Body variant="small">Footer Content</Typography.Body>
        </Page.Footer>
      </Page>
    );
    expect(getByText('This is page title')).toBeDefined();
    expect(getByText('Footer Content')).toBeDefined();
  });

  it('still works correctly without footer', () => {
    const { getByText } = render(
      <Page>
        <Page.Title>This is page title</Page.Title>
        <Page.Body>
          <Typography.Body variant="small">Body Content</Typography.Body>
        </Page.Body>
      </Page>
    );
    expect(getByText('This is page title')).toBeDefined();
    expect(getByText('Body Content')).toBeDefined();
  });
});
