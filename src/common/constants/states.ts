import type { OptionType } from '@hero-design/rn/types/components/Select/types';

export type StateType = {
  code: string;
  text?: string;
};

export const STATES: StateType[] = [
  {
    code: 'NSW',
  },
  {
    code: 'VIC',
  },
  {
    code: 'QLD',
  },
  {
    code: 'SA',
  },
  {
    code: 'WA',
  },
  {
    code: 'TAS',
  },
  {
    code: 'NT',
  },
  {
    code: 'ACT',
  },
];

export const UK_REGIONS: StateType[] = [
  {
    code: 'ENG',
    text: 'England',
  },
  {
    code: 'NIR',
    text: 'Northern Ireland',
  },
  {
    code: 'SCT',
    text: 'Scotland',
  },
  {
    code: 'WLS',
    text: 'Wales',
  },
];

export const STATE_SELECTION_OPTIONS: OptionType<string>[] = STATES.map(state => ({
  value: state.code,
  text: state.code,
}));

export const UK_REGION_OPTIONS: OptionType<string>[] = UK_REGIONS.map(region => ({
  value: region.code,
  text: region.text ?? region.code,
}));

export const ukRegionToCode = (regionName: string) => {
  return UK_REGIONS.filter(region => region.text && region.text === regionName)?.[0]?.code ?? '';
};
