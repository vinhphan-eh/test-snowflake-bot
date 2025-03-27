import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@hero-design/rn';
import { render } from '../../../../utils/testing';
import PageBody from '../PageBody';

describe('PageBody', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PageBody>
        <View>
          <Typography.Body variant="small">Body content</Typography.Body>
          <TouchableOpacity>
            <Typography.Body variant="small">A Button</Typography.Body>
          </TouchableOpacity>
        </View>
      </PageBody>
    );
    expect(getByText('Body content')).toBeDefined();
    expect(getByText('A Button')).toBeDefined();
  });
});
