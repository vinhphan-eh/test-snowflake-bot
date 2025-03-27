import React from 'react';
import { render } from '../../../utils/testing';
import { Confetti } from '../Confetti';

describe('Confetti', () => {
  it('renders', () => {
    render(<Confetti run onFinish={jest.fn()} />);
  });
});
