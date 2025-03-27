import { SuperContributionStatus, SuperContributionType } from '../../../new-graphql/generated';

export const INITIAL = SuperContributionStatus.Initial;
export const STARTED = SuperContributionStatus.Started;
export const STOPPED = SuperContributionStatus.Stopped;
export const STOPPING = SuperContributionStatus.Stopping;

export const FIXED = SuperContributionType.Fixed;
export const PERCENTAGE = SuperContributionType.Percentage;

export const ContributionTab = {
  active: 'active',
  pending: 'pending',
  archived: 'archived',
};

export const RELEVANT_LIMITS_LINK = 'https://www.ato.gov.au/Rates/Key-superannuation-rates-and-thresholds/?page=2';

export const SALARY_SACRIFICE_TITLE = 'Salary sacrifice';
