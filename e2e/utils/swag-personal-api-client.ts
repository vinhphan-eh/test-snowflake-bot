import axios from 'axios';
import { version } from '../../package.json';

const SWAG_PERSONAL_NEW_API_URL = process.env.SWAG_PERSONAL_NEW_API_URL as string;

export const swagPersonalAPIClient = axios.create({
  headers: {
    'X-Money-App-Version': version,
  },
  baseURL: SWAG_PERSONAL_NEW_API_URL,
});
