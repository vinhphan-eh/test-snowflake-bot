import { useSessionStore } from '../stores/useSessionStore';

const OLD_STORE_NAME = 'Swag';
const NEW_STORE_NAME = 'Perks';

const useStoreName = () => {
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;

  return isRebrand ? NEW_STORE_NAME : OLD_STORE_NAME;
};

export default useStoreName;
