import React from 'react';
import { Text } from 'react-native';
import { render } from '../../../utils/testing';
import { BulletLine } from '../BulletLine';

describe('BulletLine', () => {
  it('should render with given content content', () => {
    const givenContent = 'Catch me if you can';
    const { getByText } = render(<BulletLine content={givenContent} />);

    expect(getByText(givenContent)).toBeTruthy();
  });

  it('should render with content as ReactElement', () => {
    const givenContent = 'Catch me if you can';
    const { getByText } = render(<BulletLine content={<Text>{givenContent}</Text>} />);

    expect(getByText(givenContent)).toBeTruthy();
  });
});
