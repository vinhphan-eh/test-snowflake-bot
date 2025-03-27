/* eslint-disable immutable/no-let */
import Braze, { type ContentCard } from '@braze/react-native-sdk';
import type { EmitterSubscription } from 'react-native/types';
import { useMimicBrazeStore } from './useMimicBrazeStore';

// mimic super app: https://github.com/Thinkei/eh-mobile-pro/blob/42a51a486e75e36c050acb6932b433bf6651d003/app/libraries/braze/BrazeContentCardManager.ts
export function createBrazeContentCardManager() {
  // Initialize the content cards listener, ensure there is only one listener
  let contentCardListener: EmitterSubscription | undefined;
  /**
   * Promise to resolve when the content cards are refreshed.
   * This is used to prevent multiple concurrent refreshes.
   */
  let refreshPromise: Promise<Array<ContentCard>> | undefined;

  /**
   * Request a refresh of the content cards from Braze's servers.
   * @returns a list of new content cards which are saved to redux
   * @throws error if the request fails, usually due to rate limit
   */
  const requestContentCardsRefresh = async (): Promise<Array<ContentCard>> => {
    // pending refreshPromise to solve concurrency
    if (!refreshPromise) {
      refreshPromise = new Promise((resolve, reject) => {
        // use Braze.getContentCards() instead of Braze.requestContentCardsRefresh()
        // because it triggers a refresh, plus returning new cards immediately + having error handling
        // do not save cards to redux here, let the listener handle it, it could encounter rate limit here
        Braze.getContentCards()
          .then(cards => {
            resolve(cards);
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            refreshPromise = undefined;
          });
      });
    }
    return refreshPromise;
  };

  // Function to initialize the content cards listener
  const initContentCardListener = (): void => {
    if (!contentCardListener) {
      contentCardListener = Braze.addListener(Braze.Events.CONTENT_CARDS_UPDATED, update => {
          const newCards = update?.cards;
        useMimicBrazeStore.setState({ cards: newCards });
      });
    }
  };

  const cleanUpContentCardListener = (): void => {
    if (contentCardListener) {
      contentCardListener.remove();
    }
    contentCardListener = undefined;
    refreshPromise = undefined;
  };
  return { initContentCardListener, cleanUpContentCardListener, requestContentCardsRefresh };
}
