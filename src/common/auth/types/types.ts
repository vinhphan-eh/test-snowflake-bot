export interface DecodeEBenToken {
  purpose: string;
  token: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}

export interface NewEbenTokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
}

export type LoginProviderType = 'eh' | 'kp' | 'omop' | undefined;
