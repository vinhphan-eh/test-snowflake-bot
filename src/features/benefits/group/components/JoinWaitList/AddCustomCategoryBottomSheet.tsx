import React, { useState } from 'react';
import { Button, Box, BottomSheet, TextInput } from '@hero-design/rn';
import type { TUseJoinWaitListOutput } from './useJoinWaitList';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const AddCustomCategoryBottomSheet = ({
  onAddNewCategory,
  onCloseAddNewCategory,
}: Pick<TUseJoinWaitListOutput, 'onAddNewCategory' | 'onCloseAddNewCategory'>) => {
  const Intl = useIntl();
  const [name, setName] = useState('');
  return (
    <BottomSheet
      open
      onRequestClose={onCloseAddNewCategory}
      header={Intl.formatMessage({ id: 'megadeal.group.carousel.addCategory' })}
      style={{ zIndex: 2 }}
    >
      <Box paddingHorizontal="medium">
        <TextInput
          label={Intl.formatMessage({ id: 'megadeal.group.carousel.name' })}
          required
          value={name}
          onChangeText={setName}
          testID="name"
        />
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            variant="text"
            text={Intl.formatMessage({ id: 'common.add' })}
            onPress={() => {
              onAddNewCategory(name.trim());
            }}
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

export default AddCustomCategoryBottomSheet;
