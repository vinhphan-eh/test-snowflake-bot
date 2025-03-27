import React from 'react';
import { Box, Typography, Icon, List } from '@hero-design/rn';
import type { OptionAmount } from '../types';

interface ListOptionProps {
  options: OptionAmount[];
  onNext: (amount: OptionAmount) => void;
}

interface AllocationTextProps {
  amount: OptionAmount;
}

const AllocationText = ({ amount }: AllocationTextProps) => {
  if (amount === 'custom') {
    return <Typography.Body variant="regular-bold">Other</Typography.Body>;
  }

  return (
    <Typography.Body variant="regular">
      <Typography.Body variant="small-bold">{amount}%</Typography.Body> of my pay
    </Typography.Body>
  );
};

export const ListOptions = ({ onNext, options }: ListOptionProps) => {
  return (
    <Box>
      {options.map(amount => (
        <Box key={amount} marginTop="medium">
          <List.Item
            variant="card"
            title={<AllocationText amount={amount} />}
            suffix={<Icon icon="arrow-right" intent="primary" />}
            onPress={() => onNext(amount)}
            testID={`paysplit-${amount}%`}
          />
        </Box>
      ))}
    </Box>
  );
};
