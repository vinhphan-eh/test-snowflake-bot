import { type AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import keypayClient from './keypay-client';
import type { KPAccountDetails } from './prepare-instapay-account';
import { SupportedCountries, type PayFrequency } from './utils';
import { getTimezoneByCountry } from './utils';

type LoginKPResponse = {
  twofa_required: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const login = async (account: { email: string; password: string }, country: `${SupportedCountries}` = 'AU') => {
  return keypayClient({ country })
    .post<unknown, AxiosResponse<LoginKPResponse>>(
      '/api/v2/twofactor/mobileauth',
      {
        Username: account.email,
        Password: account.password,
        DeviceId: device.id,
        ClientId: 'H3t5s7qPU4D6jsFfjWjTAxtk',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // this request doesn't need authorization
          Authorization: '',
        },
      }
    )
    .then(response => response.data);
};

export const createPayRun = async (params: {
  businessId: string;
  paymentDate: Dayjs;
  payPeriodEnding: Dayjs;
  payScheduleId: string;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country: params.country })
    .post(`/api/v2/business/${params.businessId}/payrun`, {
      createWithEmptyPays: false,
      datePaid: params.paymentDate.format('YYYY-MM-DD'),
      payScheduleId: params.payScheduleId,
      payPeriodEnding: params.payPeriodEnding.format('YYYY-MM-DD'),
      timesheetImportOption: 'ThisPayPeriod', // Include all timesheet during this pay period
    })
    .then(response => response.data);
};

// delete unfinalized payrun
export const deletePayrun = async (params: {
  businessId: string;
  payrunId: string;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country: params.country })
    .delete(`/api/v2/business/${params.businessId}/payrun/${params.payrunId}`)
    .then(response => response.data);
};

/**
 * Finalize and publish payrun
 * @param params
 */
export const publishPayRun = async (params: {
  businessId: string;
  payRunId: number;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country: params.country }).post(
    `/api/v2/business/${params.businessId}/payrun/${params.payRunId}/finalise`,
    {
      publishPaySlips: 'Immediate',
      // submit UK payrun immediately to HMRC
      lodgePayRunPreference: params.country === SupportedCountries.GB ? 'Immediate' : '',
    }
  );
};

export const getPaySchedules = async (businessId: string, country?: `${SupportedCountries}`) => {
  return keypayClient({ country })
    .get(`/api/v2/business/${businessId}/payschedule`)
    .then(response => response.data);
};

export const getPaySchedule = async (
  businessId: string,
  payFrequency: PayFrequency,
  payScheduleName?: string,
  country?: `${SupportedCountries}`
) => {
  const paySchedules = await getPaySchedules(businessId, country);
  const targetedPaySchedule = paySchedules.find(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    paySchedule => paySchedule.frequency === payFrequency && (!payScheduleName || payScheduleName == paySchedule.name)
  );
  if (!targetedPaySchedule?.id) {
    throw new Error('Pay schedule not found');
  }

  return targetedPaySchedule;
};

export const createTimesheet = async (params: {
  businessId: string;
  employeeId: string;
  startTime: Dayjs;
  endDate: Dayjs;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country: params.country })
    .post(`/api/v2/business/${params.businessId}/timesheet`, {
      employeeId: params.employeeId,
      endTime: params.endDate.format('YYYY-MM-DDTHH:mm:ss'), // Format `2024-03-15T14:30:00`. No milliseconds and timezone
      startTime: params.startTime.format('YYYY-MM-DDTHH:mm:ss'), // Format `2024-03-15T14:30:00`. No milliseconds and timezone
    })
    .then(response => response.data);
};

export const approveTimesheet = async (params: {
  businessId: string;
  timesheetId: number;
  timesheetData: Record<string, unknown>;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country: params.country })
    .put(`/api/v2/business/${params.businessId}/timesheet/${params.timesheetId}`, {
      ...params.timesheetData,
      status: 'Approved',
    })
    .then(response => response.data);
};

export const getApprovedTimesheets = async (params: {
  businessId: string;
  employeeId: string;
  startTime: Dayjs;
  endTime: Dayjs;
  country: `${SupportedCountries}`;
}) => {
  const startTimeStr = dayjs.tz(params.startTime, getTimezoneByCountry(params.country)).format('YYYY-MM-DD'); // Format `2024-03-15`
  const endTimeStr = dayjs.tz(params.endTime, getTimezoneByCountry(params.country)).format('YYYY-MM-DD'); // Format `2024-03-15`
  const filter = `EmployeeId eq ${params.employeeId} and Status eq 'Approved' and StartTime ge datetime'${startTimeStr}' and EndTime le datetime'${endTimeStr}'`;
  return keypayClient({ country: params.country })
    .get(`/api/v2/business/${params.businessId}/timesheet`, {
      params: {
        $filter: filter,
      },
    })
    .then(response => response.data);
};

const getLatestPayRunTotal = async ({
  businessId,
  country,
  employeeId,
}: {
  businessId: string;
  employeeId: string;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country })
    .get(`/api/v2/business/${businessId}/employee/${employeeId}/payruntotals`)
    .then(response => {
      const publishedPayRuns = response.data.filter((payrun: { isPublished: boolean }) => payrun.isPublished);

      return publishedPayRuns[publishedPayRuns.length - 1];
    });
};

export const getEmployeePayRunTotal = async ({
  businessId,
  country,
  employeeId,
}: {
  businessId: string;
  employeeId: string;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country })
    .get(`/api/v2/business/${businessId}/employee/${employeeId}/payruntotals`)
    .then(response => {
      const publishedPayRuns = response.data.filter((payrun: { isPublished: boolean }) => payrun.isPublished);

      return publishedPayRuns.length;
    });
};

export const getLatestPayRun = async ({
  businessId,
  country,
  employeeId,
}: {
  businessId: string;
  employeeId: string;
  country: `${SupportedCountries}`;
}) => {
  const payRunTotal = await getLatestPayRunTotal({ businessId, employeeId, country });
  return keypayClient({ country })
    .get(`/api/v2/business/${businessId}/payrun/${payRunTotal.payRunId}`)
    .then(response => response.data);
};

export const getBusiness = async ({
  businessId,
  country,
}: {
  businessId: string;
  country: `${SupportedCountries}`;
}) => {
  return keypayClient({ country })
    .get(`/api/v2/business/${businessId}`)
    .then(response => response.data);
};

export const createLeaveRequest = async (
  account: KPAccountDetails,
  leaveData: { startDate: Dayjs; endDate: Dayjs; leaveCategoryId: number }
) => {
  const dateFormat = 'YYYY-MM-DD';

  const getPayload = () => {
    switch (account.country) {
      case 'GB':
        return {
          automaticallyApprove: true,
          employeeId: account.kpEmployeeId,
          fromDate: leaveData.startDate.format(dateFormat),
          leaveCategoryId: leaveData.leaveCategoryId,
          notes: '',
          requireNotesForLeaveRequests: false,
          toDate: leaveData.endDate.format(dateFormat),
          units: 1, // 1 working day
        };
      default:
        return {
          automaticallyApprove: true,
          employeeId: account.kpEmployeeId,
          fromDate: leaveData.startDate.format(dateFormat),
          leaveCategoryId: leaveData.leaveCategoryId,
          notes: '',
          requireNotesForLeaveRequests: false,
          toDate: leaveData.endDate.format(dateFormat),
          hours: 7.6, // equivalent to 1 working day
        };
    }
  };

  const leaveRequest = await keypayClient({ country: account.country }).post(
    `api/v2/business/${account.kpBusinessId}/employee/${account.kpEmployeeId}/leaverequest`,
    getPayload()
  );
  return leaveRequest.data.id;
};

export const deleteLeaveRequest = async (account: KPAccountDetails, leaveRequestId: number) => {
  await keypayClient({ country: account.country }).delete(
    `api/v2/business/${account.kpBusinessId}/employee/${account.kpEmployeeId}/leaverequest/${leaveRequestId}`
  );
};
