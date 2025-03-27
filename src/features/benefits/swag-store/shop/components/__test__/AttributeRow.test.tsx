import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { AttributeRow } from '../AttributeRow';

describe('Attribute Row', () => {
  it('should render correctly', () => {
    const { getByText } = render(<AttributeRow label="Label" content="Content" />);
    expect(getByText('Label')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });
});
