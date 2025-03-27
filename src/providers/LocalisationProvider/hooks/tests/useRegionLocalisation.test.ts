import { renderHook } from '@testing-library/react-hooks';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { waitFor } from '../../../../common/utils/testing';
import { getRegionByCountry, useRegionLocalisation } from '../useRegionLocalisation';

describe('useRegionLocalisation', () => {
  it('should update the region when setRegion function called', async () => {
    const {
      result: {
        current: { currentRegion, setRegion },
      },
    } = renderHook(() => useRegionLocalisation());

    expect(currentRegion).toBe('AU');
    setRegion('GB');
  });

  it('should fallback to AU if region of user is outside the supported list', async () => {
    await waitFor(() => {
      expect(getRegionByCountry('VN')).toBe('AU');
    });
  });

  it('should format the copy that depends strictly on the region', async () => {
    regionLocalisationMockUtil('AU');

    const {
      result: {
        current: { formatMessage },
      },
    } = renderHook(() => useRegionLocalisation());

    await waitFor(() => {
      const regionLocalisationCopyContent = formatMessage({ id: 'product' });
      expect(regionLocalisationCopyContent).toBe('AU Product Name');
    });
  });
});
