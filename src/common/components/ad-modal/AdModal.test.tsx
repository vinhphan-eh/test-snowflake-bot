import React, { useEffect, useRef } from 'react';
import type { AdModalMethods, AdModalProps } from './AdModal';
import { AdModal } from './AdModal';
import images from '../../assets/images';
import { render, fireEvent } from '../../utils/testing';

const AdModalWrapper = (props: { show?: boolean } & AdModalProps) => {
  const ref = useRef<AdModalMethods>(null);

  useEffect(() => {
    if (props.show) {
      ref.current?.show();
    }
  }, [props.show]);

  return <AdModal ref={ref} {...props} />;
};

describe('AdModal', () => {
  it('should display all given content', () => {
    const { getByText } = render(
      <AdModalWrapper
        show
        image={images.instapayAd}
        title="InstaPay Now"
        description="Awesome ad for you"
        buttons={[
          {
            key: 'giveme',
            text: 'Give me',
            onPress: () => {},
          },
        ]}
      />
    );

    getByText('InstaPay Now');
    getByText('Awesome ad for you');
    getByText('Give me');
  });

  it('should call onPressCta when click CTA', () => {
    const mockOnPress = jest.fn();
    const { getByLabelText } = render(
      <AdModalWrapper
        show
        image={images.instapayAd}
        title="InstaPay Now"
        description="Awesome ad for you"
        buttons={[
          {
            key: 'giveme',
            text: 'Give me',
            onPress: mockOnPress,
            accessibilityLabel: 'Give me',
          },
        ]}
        accessibilityLabel="InstaPay Now ad"
      />
    );

    const ctaBtn = getByLabelText('Give me');
    fireEvent.press(ctaBtn);

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
