import React from 'react';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { render, fireEvent, renderHook } from '../../../../common/utils/testing';
import { CashbackTile } from '../CashbackTile';

describe('Cashback Tile', () => {
  it('should render correctly', () => {
    const mockPress = jest.fn();
    const mockSetPillar = jest.fn();
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.setPillar = mockSetPillar;

    const { getByLabelText, getByText } = render(<CashbackTile title="Title" content="Content" action={mockPress} />);

    fireEvent.press(getByLabelText('Title card'));
    expect(mockPress).toBeCalled();
    expect(mockSetPillar).toBeCalledWith('BenefitsApp');
    expect(mockedEventTracking).toBeCalledWith({
      event: 'mobile#tile#cashback#Title',
      categoryName: 'user action',
      metaData: {
        module: 'Swag dashboard tiles',
      },
    });
    expect(getByText('Cashback offer')).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });
});
