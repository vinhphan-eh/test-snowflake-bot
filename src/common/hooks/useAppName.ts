import { useSessionStore } from '../stores/useSessionStore';

const OLD_APP_NAME = 'Swag';
const NEW_APP_NAME = 'Employment Hero Work';

const useAppName = () => {
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;

  return isRebrand ? NEW_APP_NAME : OLD_APP_NAME;
};

export default useAppName;
