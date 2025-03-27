export const DEFAULT_TRANSACTION_PAGE_LIMIT = 10;

export const mapTransactionTitle = (transactionName: string) => {
  const isFromPokitPal = transactionName.toLowerCase().includes('pokitpal');
  return isFromPokitPal ? 'Cashback' : transactionName;
};

export const mapTransactionDetail = (transactionName: string, brandName?: string) => {
  const isFromPokitPal = transactionName.toLowerCase().includes('pokitpal');
  const programName = brandName || 'Swag';
  return isFromPokitPal ? `${programName} Cashback Program` : transactionName;
};

export const mapTransactionDescription = (description: string) => {
  return description.toLowerCase().includes('pokitpal') ? 'Cashback' : description;
};
