import React from 'react';
import { Button, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useCreateStashStore } from '../stores/useCreateStashStore';
import { useStashListStore } from '../stores/useStashListStore';

interface FormInput {
  stashName: string;
}

export const StashNameScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashName'>>();
  const { stashNamesList } = useStashListStore();
  const { setName } = useCreateStashStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();

  const stashNameWordRule: RegisterOptions = {
    validate: (e: string) => {
      if (stashNamesList?.includes(e)) {
        return 'You already have a Stash with this name. Choose a different name';
      }

      return true;
    },
  };

  const onNext = (data: FormInput) => {
    setName(data.stashName);
    navigation.navigate('StashGoal');
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Create a Stash" />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
              <Page.Title>What would you like to name your Stash?</Page.Title>
              <Page.Body>
                <Field control={control} name="stashName" label="Stash name" isRequired rules={stashNameWordRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      autoComplete="off"
                      maxLength={20}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="stashName-input"
                      error={error?.message}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button text="Next" accessibilityLabel="Next" disabled={!isValid} onPress={handleSubmit(onNext)} />
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
