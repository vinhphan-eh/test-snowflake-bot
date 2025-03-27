import type { ReactTestInstance } from 'react-test-renderer';

const getDisabledProp = (button: ReactTestInstance) => button.props.children[0].props.children[1].props.disabled;

/**
 * This is an attempt to write more readable tests related to Hero Design;
 * because a button is composed from View and Text, we usually need to dive into implement details.
 */
export const expectHeroButton = (button: ReactTestInstance) => {
  return {
    not: {
      toBeDisabled: () => {
        expect(getDisabledProp(button)).toBeFalsy();
      },
    },
    toBeDisabled: () => {
      expect(getDisabledProp(button)).toBeTruthy();
    },
  };
};
