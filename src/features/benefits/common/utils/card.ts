import { CardImages } from '../../cash-back/card-link-offers/constants/cardImg';

export const mapCardIconSource = (issuer: string) => CardImages[issuer] ?? undefined;
