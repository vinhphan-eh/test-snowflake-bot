import React from 'react';
import { render } from '../../../utils/testing';
import { OutcomeTemplate } from '../OutcomeTemplate';

describe('Outcome Template', () => {
  it('should render correctly', () => {
    const comp = render(
      <OutcomeTemplate
        imageName="ice-cream-benefits"
        title="title"
        content="content"
        imageAccessibilityLabel="image a11y label"
      />
    );
    expect(comp.getByText('title')).toBeTruthy();
    expect(comp.getByText('content')).toBeTruthy();
    expect(comp.getByLabelText('image a11y label')).toBeTruthy();
  });
});
