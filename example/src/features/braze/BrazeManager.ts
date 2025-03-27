import Braze from '@braze/react-native-sdk';
import { createBrazeContentCardManager } from './BrazeContentCardManager';

// mimic super app https://github.com/Thinkei/eh-mobile-pro/blob/42a51a486e75e36c050acb6932b433bf6651d003/app/libraries/braze/BrazeManager.ts
export function createBrazeManager() {
  const { initContentCardListener, cleanUpContentCardListener, requestContentCardsRefresh } =
    createBrazeContentCardManager();

  const init = (uuid: string): void => {
    // Set the user and request content cards refresh
    Braze.changeUser(uuid);
    initContentCardListener(); // Initialize the content cards listener
    requestContentCardsRefresh(); // Request a refresh of the content cards
  };
  const cleanUp = (): void => {
    // Clean up the content cards listener
    cleanUpContentCardListener();
  };

  return { init, cleanUp, requestContentCardsRefresh };
}

const BrazeManager = createBrazeManager();
export default BrazeManager;
