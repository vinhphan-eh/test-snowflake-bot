import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { MINIMUM_MEMBER_COUNT_INDICATOR } from '../../constants';
import { getMemberCount } from '../../utils/getMemberCount';

type MemberCountProps = {
  memberCount: number;
};

const { Body, Caption } = Typography;

export const MemberCount = ({ memberCount }: MemberCountProps) => {
  if (memberCount <= 0) {
    return null;
  }

  return (
    <Box flexDirection="row" alignItems="center">
      <Box flexDirection="row" alignItems="flex-end" marginBottom="small">
        <Caption intent="subdued">{getMemberCount(memberCount)}</Caption>
        {memberCount > MINIMUM_MEMBER_COUNT_INDICATOR && <Body intent="subdued">{'\u207A'}</Body>}
        <Caption intent="subdued"> users supported</Caption>
      </Box>
    </Box>
  );
};
