import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@hero-design/rn';
import { render } from '../../../../utils/testing';
import PageFooter from '../PageFooter';

describe('PageFooter', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PageFooter>
        <View>
          <Typography.Body variant="small">Footer content</Typography.Body>
          <TouchableOpacity>
            <Typography.Body variant="small">A Button</Typography.Body>
          </TouchableOpacity>
        </View>
      </PageFooter>
    );
    expect(getByText('Footer content')).toBeDefined();
    expect(getByText('A Button')).toBeDefined();
  });
});
