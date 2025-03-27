import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockedReplace } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { customRender, fireEvent, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockCreateComplaintTicketMutation } from '../../../../new-graphql/generated';
import { useAccessToken } from '../../hooks/useAccessToken';
import { SupportRequestScreen } from '../SupportRequestScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseAccessToken = useAccessToken as jest.MockedFn<typeof useAccessToken>;

jest.mock('../../hooks/useAccessToken');
jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: jest.fn(),
  }),
}));

describe('Support Request Screen', () => {
  beforeEach(() => {
    mockUseAccessToken.mockReturnValue('3333333333');
  });

  it.each<[string, { message: string; description: string; image: string }]>([
    [
      'Complaint',
      {
        message: 'Your complaint has been submitted.',
        description: 'Our team will look into it and get back to you soon via email.',
        image: 'snailMoney',
      },
    ],
  ])('should navigate to correct success screen', async (type, outcome) => {
    mockedUseRoute.mockReturnValue({
      params: { type, subject: '', feature: 'Money_SwagSpendAccount' },
      key: '',
      name: '',
    });
    mockServerNode.use(
      mockCreateComplaintTicketMutation((_, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.delay(100),
          ctx.data({
            createComplaintTicket: {
              success: true,
            },
          })
        );
      })
    );

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    const { getByTestId } = customRender(<SupportRequestScreen />);

    await waitFor(() => {
      const descriptionInput = getByTestId('support-request-textarea');
      const mockSubmitBtn = getByTestId('button-submit-complaint-form');
      fireEvent.changeText(descriptionInput, 'Support Message');
      fireEvent.press(mockSubmitBtn);
    });

    await waitFor(() => {
      expect(mockedEventTracking).toHaveBeenCalledWith({
        event: 'Click on submit',
        categoryName: 'user action',
        metaData: {
          module: 'Settings',
        },
      });

      expect(mockedReplace).toBeCalledWith('RequestOutcome', outcome);
    });
  });

  it('should navigate to error screen on failures', async () => {
    mockedUseRoute.mockReturnValue({
      params: { type: 'Complaint', subject: '', feature: 'Money_SwagSpendAccount' },
      key: '',
      name: '',
    });
    mockServerNode.use(
      mockCreateComplaintTicketMutation((_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.delay(100),
          ctx.data({
            createComplaintTicket: {
              success: false,
            },
          })
        );
      })
    );

    const { getByTestId } = customRender(<SupportRequestScreen />);

    await waitFor(() => {
      const descriptionInput = getByTestId('support-request-textarea');
      const mockSubmitBtn = getByTestId('button-submit-complaint-form');
      fireEvent.changeText(descriptionInput, 'Support Message');
      fireEvent.press(mockSubmitBtn);
    });

    await waitFor(() => {
      expect(mockedReplace).toBeCalledWith('GeneralError');
    });
  });

  it('should go back previous screen by using back chevron', async () => {
    mockedUseRoute.mockReturnValue({
      params: { subject: '', feature: 'Money_SwagSpendAccount' },
      key: '',
      name: '',
    });
    const { getByTestId } = customRender(<SupportRequestScreen />);

    await waitFor(() => {
      const button = getByTestId('topbar-back-icon');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalled();
    });
  });
});
