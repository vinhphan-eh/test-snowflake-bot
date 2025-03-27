export type DrawerTransaction = {
  // Keep only the required fields for display
  id: string;
  currencyAmount: {
    amount: number;
  };
  transferPeerDetails: {
    name: string;
  };
  dateTimeUTC: string;
};
