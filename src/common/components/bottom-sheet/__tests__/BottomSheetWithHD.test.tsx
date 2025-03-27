import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../utils/testing';
import { BottomSheetView } from '../BottomSheet';
import { BottomSheetWithHD } from '../BottomSheetWithHD';

describe('Custom Bottom Sheet View', () => {
  it('should render correctly with hero design component', async () => {
    const { getByText } = render(
      <BottomSheetWithHD snapPoints={[1, 100]}>
        <BottomSheetView>
          <Typography.Body variant="small">Hello</Typography.Body>
        </BottomSheetView>
      </BottomSheetWithHD>
    );

    expect(getByText('Hello')).toBeTruthy();
  });

  it('can work with theme', async () => {
    const { getByText } = render(
      <BottomSheetWithHD snapPoints={[1, 100]}>
        {theme => (
          <BottomSheetView>
            <Typography.Body variant="small" style={{ marginTop: theme.space.large }}>
              Hello
            </Typography.Body>
          </BottomSheetView>
        )}
      </BottomSheetWithHD>
    );

    expect(getByText('Hello')).toBeTruthy();
  });
});
