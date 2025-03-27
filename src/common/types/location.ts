export enum LocationType {
  Live = 'Live',
  Address = 'Address',
}

export type LocationOption = {
  key: LocationType;
  label: string;
};

export type SelectedLocation = {
  type: LocationType;
  name?: string;
  addressLocation?: {
    latitude: number;
    longitude: number;
  };
};
