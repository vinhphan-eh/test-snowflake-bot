import React, { useRef, useState } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import { Button, DatePicker, Select, TextInput, Typography, useTheme } from '@hero-design/rn';
import type { OptionType } from '@hero-design/rn/types/components/Select/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import valid from 'card-validator';
import dayjs from 'dayjs';
import type { RegisterOptions, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../../common/components/layout';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../../common/components/touch-dismiss-keyboard';
import { DISPLAY_MONTH_YEAR_FOR_CARD } from '../../../../../common/constants/date';
import { useMixpanel } from '../../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';
import { formatCardNumber } from '../../../../../common/utils/numbers';
import { dateRegex } from '../../../../../common/validations';
import { useGetEnrolCardDetailScreenQuery } from '../../../../../new-graphql/generated';
import { mapCardIconSource } from '../../../common/utils/card';
import { CASHBACK_MODULE, CLICK_ADD } from '../constants/mixpanel';
import { useEnrolCardFlow, type EnrolCardData } from '../hooks/useEnrolCardFlow';
import type { CardLinkOffersNavigationProp, CardLinkOffersRouteProp } from '../navigation/navigationType';

const acceptedCardType = ['mastercard', 'visa'];
const heroWalletIssuer = 'visa';

interface FormInput {
  cardNumber: string;
  expiryDate: Date;
  bankProvider: string;
}

const birthdayRule: RegisterOptions = {
  pattern: {
    value: dateRegex,
    message: 'Invalid Date',
  },
};

export const EnrolCardDetailsScreen = () => {
  const navigation = useNavigation<CardLinkOffersNavigationProp<'EnrolCardDetails'>>();
  const route = useRoute<CardLinkOffersRouteProp<'EnrolCardDetails'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { data } = useGetEnrolCardDetailScreenQuery();
  const { colors, space } = useTheme();
  const cardErrorTemp = useRef('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [disableBankProvider, setDisableBankProvider] = useState(false);
  const [cardImg, setCardImg] = useState<ImageSourcePropType | undefined>(undefined);
  const { enrolCard, isLoading: isEnrollingCard } = useEnrolCardFlow(true);
  const { eventTracking } = useMixpanel();
  const isHeroWalletLinked = route.params.haveHeroWallet;

  const heroWalletBinRange = data?.me?.wallet?.ehBinRange;
  const ehProviderId = data?.me?.cashback?.ehProviderId.id;

  const banks = data?.me?.cashback?.banks?.edges ?? [];

  const minDate = dayjs().add(1, 'month').toDate();
  const maxDate = dayjs().add(10, 'year').toDate();

  const bankOptions: OptionType<string>[] = banks.map(e => ({
    value: `${e.node.id}`,
    text: e.node.name,
  }));

  const onAdd = async (enrolCardInput: FormInput) => {
    eventTracking({
      event: CLICK_ADD,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
    const input: EnrolCardData = {
      cardNumber: enrolCardInput.cardNumber,
      // must be in MM/YY format, don't use DISPLAY_MONTH_YEAR_FOR_CARD, HD requires MM/yy ?
      expiryDate: dayjs(enrolCardInput.expiryDate).format('MM/YY'),
      bankProvider: enrolCardInput.bankProvider,
    };
    await enrolCard(input);
    navigation.goBack();
  };

  const handleConfirm = (confirmedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('expiryDate', confirmedDate, { shouldValidate: true });
  };

  const verifyHeroWallet = (cardNumber: string, cardType: string, setControlValue: UseFormSetValue<FormInput>) => {
    if (cardType === heroWalletIssuer && heroWalletBinRange?.from && heroWalletBinRange.to) {
      const cardInNumber = parseInt(cardNumber, 10);
      const cardBinFrom = parseInt(heroWalletBinRange.from, 10);
      const cardBinTo = parseInt(heroWalletBinRange.to, 10);

      if (cardInNumber >= cardBinFrom && cardInNumber <= cardBinTo && ehProviderId) {
        setControlValue('bankProvider', ehProviderId);
        if (isHeroWalletLinked) {
          cardErrorTemp.current = 'Swag Visa Debit card already enrolled';
        }
        if (!disableBankProvider) {
          setDisableBankProvider(true);
        }
      }
    }
  };

  // custom validate that apply to field rules
  const validateCardNumber = (value: string, setControlValue: UseFormSetValue<FormInput>) => {
    const onlyNumbers = value.replace(/\s/g, '');
    const validateResult = valid.number(onlyNumbers);
    const cardType = validateResult.card?.type ?? '';
    const isValidCard = validateResult.isValid;

    // temporarily store inValid state to ref
    // we don't want to show error immediate, just mark field as invalid
    // later will set error when onBlur
    // why need to mark field invalid here, why dont mark it at onBlur ?
    // because user can press Action Button (Add) before onBlur called

    if (acceptedCardType.includes(cardType) && isValidCard) {
      cardErrorTemp.current = '';
      const issuerImg = mapCardIconSource(cardType);
      setCardImg(issuerImg);
      verifyHeroWallet(onlyNumbers, cardType, setControlValue);
    } else {
      if (disableBankProvider) {
        setDisableBankProvider(false);
      }
      cardErrorTemp.current = 'Card number invalid';
      setCardImg(undefined);
    }
    return cardErrorTemp.current === '';
  };

  const renderCardImg = () => {
    if (cardImg) {
      return (
        <Image testID="card_img" style={{ marginHorizontal: space.xsmall, height: 24, width: 48 }} source={cardImg} />
      );
    }
    return undefined;
  };

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Form<FormInput>>
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <>
            <Page.TopBar
              style={{ backgroundColor: colors.defaultGlobalSurface }}
              hideLeft
              onRightPress={navigation.goBack}
              iconRight="cancel"
            />
            <TouchOutsideDismissKeyboard testID="enrol-card-details-screen">
              <Page
                keyboardShouldPersistTaps="handled"
                style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}
              >
                <Page.Title>Add card</Page.Title>
                <Page.Body marginBottom="small">
                  <Typography.Body variant="small" style={{ marginBottom: space.medium }}>
                    You can enrol up to 4 Visa cards and 5 Mastercards.
                  </Typography.Body>
                  <Field
                    control={control}
                    name="cardNumber"
                    label="Card number"
                    isRequired
                    rules={{
                      validate: value => validateCardNumber(value as string, setValue),
                      onBlur: () => {
                        if (cardErrorTemp.current) {
                          setCardNumberError(cardErrorTemp.current);
                        }
                      },
                    }}
                  >
                    {({ field, fieldState: { error } }) => {
                      // when field is empty and invalid, should show required message
                      // else: validate card number
                      const errorFromField = error?.message ?? '';
                      const errorMessage = cardNumberError && field?.value ? cardNumberError : errorFromField;
                      return (
                        <TextInput
                          {...field}
                          value={field.value as string}
                          autoComplete="off"
                          onChangeText={text => {
                            field.onChange(formatCardNumber(text));
                          }}
                          testID="card-number-input"
                          keyboardType="numeric"
                          maxLength={19}
                          onFocus={() => {
                            // hide error when focus/typing
                            field.onFocus?.();
                            setCardNumberError('');
                          }}
                          error={errorMessage}
                          suffix={renderCardImg()}
                          required={field.isRequired}
                          style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.medium }}
                        />
                      );
                    }}
                  </Field>
                  <Field control={control} rules={birthdayRule} isRequired name="expiryDate" label="Expiry date">
                    {({ field, fieldState: { error } }) => (
                      <DatePicker
                        confirmLabel="Confirm"
                        testID="dob-input"
                        value={(field.value as Date) ?? undefined}
                        label="Expiry date"
                        variant="month-year"
                        displayFormat={DISPLAY_MONTH_YEAR_FOR_CARD}
                        error={error?.message}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={date => handleConfirm(date, setValue)}
                      />
                    )}
                  </Field>
                  <Field control={control} name="bankProvider" label="Bank provider" isRequired>
                    {({ field, fieldState: { error } }) => (
                      <Select
                        options={bankOptions}
                        value={field.value}
                        onConfirm={value => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                        testID="bank-provider"
                        keyExtractor={item => `${item.key}${item.text}`}
                        label={field.label ?? ''}
                        required={field.isRequired}
                        error={error?.message}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                </Page.Body>
                <Page.Footer>
                  <Button
                    loading={isEnrollingCard}
                    disabled={!isValid}
                    intent="primary"
                    onPress={handleSubmit(onAdd)}
                    accessibilityLabel="Add"
                    text="Add"
                  />
                </Page.Footer>
              </Page>
            </TouchOutsideDismissKeyboard>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};
