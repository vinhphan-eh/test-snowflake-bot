import {
  eBensSystemPalette,
  swagLightSystemPalette,
  swagSystemPalette,
} from '@hero-design/rn';

export const USE_SWAG = true;

export enum PillarIds {
  SWAG_APP = 'SwagApp',
  WALLET_APP = 'WalletApp',
  BENEFITS_APP = 'BenefitsApp',
}

export const PILLARS = (benefitsPermission: boolean) => [
  {
    id: PillarIds.SWAG_APP,
    name: 'SWAG',
    icon: 'swag',
    color: swagSystemPalette.warning,
  },
  {
    id: PillarIds.WALLET_APP,
    name: 'Money',
    icon: 'coin-outlined',
    color: swagLightSystemPalette.decorativePrimarySurface,
  },
  ...(benefitsPermission
    ? [
        {
          id: PillarIds.BENEFITS_APP,
          name: 'Perks',
          icon: 'redeem',
          color: eBensSystemPalette.decorativePrimary,
        },
      ]
    : []),
];
