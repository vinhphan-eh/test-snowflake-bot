import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import type { MockQueryResult } from '../../../../common/types/react-query';
import { render } from '../../../../common/utils/testing';
import {
  useGetStashMetadataQuery,
  useSetStashMetadataMutation,
  type GetStashMetadataQuery,
} from '../../../../new-graphql/generated';
import { StashIntroductionScreen } from '../StashIntroductionScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  useSetStashMetadataMutation: jest.fn(),
  useGetStashMetadataQuery: jest.fn(),
}));
const mockUseGetStashMetaQuery = useGetStashMetadataQuery as unknown as jest.Mock<
  MockQueryResult<GetStashMetadataQuery>
>;
(mockUseGetStashMetaQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../common/hooks/useMixpanel');

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('StashIntroductionScreen', () => {
  beforeEach(() => {
    (useRoute as jest.MockedFunction<typeof useRoute>).mockReturnValue({
      params: {},
      key: '',
      name: '',
    });
  });

  it('should render correctly', () => {
    (useSetStashMetadataMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIntroductionScreen />
      </NavigationContext.Provider>
    );
    expect(getByTestId('carousel-stash')).toBeTruthy();
  });
});
