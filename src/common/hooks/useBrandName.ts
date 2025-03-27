import { useSessionStore } from '../stores/useSessionStore';

const OLD_BRAND_NAME = 'Swag';
const NEW_BRAND_NAME = 'Employment Hero';

const useBrandName = () => {
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;

  return isRebrand ? NEW_BRAND_NAME : OLD_BRAND_NAME;
};

export default useBrandName;
