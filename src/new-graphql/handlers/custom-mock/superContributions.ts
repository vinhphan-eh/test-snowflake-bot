import {
  FIXED,
  PERCENTAGE,
  INITIAL,
  STARTED,
  STOPPED,
  STOPPING,
} from '../../../features/super/salary-sacrifice/constants';

export const MockGetSuperContributions = [
  {
    id: '76bf6403-3947-483b-9f4f-fa828e0b13fb',
    membershipId: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: FIXED,
    contributionValue: 1000,
    preserveAmount: 10,
    status: STARTED,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '2023-09-30T00:00:00.000Z',
  },
  {
    id: 'c8218f99-eb77-477c-a1eb-0da0c59f0e34',
    membershipId: '8334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: FIXED,
    contributionValue: 2000,
    preserveAmount: 200,
    status: INITIAL,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '2023-05-31T00:00:00.000Z',
  },
  {
    id: 'ca29871f-027d-4ddc-b0fd-74ab1cf7340d',
    membershipId: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: PERCENTAGE,
    contributionValue: 1720,
    preserveAmount: 20000,
    status: INITIAL,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '',
  },
  {
    id: 'ca29871f-027d-1ddc-b0fd-74ab1cf7340d',
    membershipId: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: PERCENTAGE,
    contributionValue: 1720,
    preserveAmount: 20000,
    status: STOPPING,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '',
  },
  {
    id: 'c8218f99-eb77-477c-61eb-0da0c59f0e34',
    membershipId: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: FIXED,
    contributionValue: 2000,
    preserveAmount: 200,
    status: STOPPED,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '2023-05-31T00:00:00.000Z',
  },
  {
    id: 'r8218f99-eb77-477c-61eb-0da0c59f0e34',
    membershipId: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    contributionType: FIXED,
    contributionValue: 5000,
    preserveAmount: 200,
    status: STARTED,
    startDate: '2023-05-24T00:00:00.000Z',
    endDate: '2023-05-31T00:00:00.000Z',
  },
];

export const MockGetOrgs = [
  {
    id: 'a8218f99-eb77-477c-61eb-0da0c59f0e34',
    memberUuid: '9334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    name: 'Squad HRV',
  },
  {
    id: 'b8218f99-eb77-477c-61eb-0da0c59f0e34',
    memberUuid: '8334b9a5-9a01-4a53-a3ec-292c3e76fce8',
    name: 'Employment Hero',
  },
];
