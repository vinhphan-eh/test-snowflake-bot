import React from 'react';
import { Text } from 'react-native';
import { render } from '../../../utils/testing';
import { CustomBottomSheetView } from '../CustomBottomSheetView';

describe('Custom Bottom Sheet View', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<CustomBottomSheetView content={() => <Text>Content</Text>} title="Bottom Sheet" />);

    expect(getByText('Content')).toBeTruthy();
  });
});
