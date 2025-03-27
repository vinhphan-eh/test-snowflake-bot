import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../utils/testing';
import { Collapse } from '../Collapse';

describe('Collapse', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Collapse open>
          <Typography.Body variant="small">Text</Typography.Body>
        </Collapse>
      )
    ).toBeTruthy();
  });
});
