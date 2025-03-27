import { create } from 'zustand';

// Describe the which screen navigate to
interface WalletOnboardingConsumer {
  consumer: WalletOnboardingConsumerType | null;
}
enum WalletOnboardingConsumerType {
  Cashback = 'Cashback',
  Default = 'Default',
}
const useWalletOnboardingConsumerStore = create<WalletOnboardingConsumer>()(() => ({
  consumer: null,
}));

const useWalletOnboardingConsumer = () => {
  const consumer = useWalletOnboardingConsumerStore(state => state.consumer);

  const setConsumer = (c: WalletOnboardingConsumerType) => {
    useWalletOnboardingConsumerStore.setState({
      consumer: c,
    });
  };

  const clearConsumer = () => {
    useWalletOnboardingConsumerStore.setState({
      consumer: null,
    });
  };

  return { setConsumer, consumer, clearConsumer };
};

export { useWalletOnboardingConsumer, WalletOnboardingConsumerType };
