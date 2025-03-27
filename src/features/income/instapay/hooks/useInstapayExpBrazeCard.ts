import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';

export const useInstapayExpBrazeCard = (id: string) => {
  const { cards } = useLoadBrazeContentCards();

  const contentCard = cards?.find(card => card.extras?.id === id);

  return {
    contentCard,
  };
};
