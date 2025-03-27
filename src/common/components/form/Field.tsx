import React, { useEffect, useState } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

export type UseControllerReturn<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * Field handlers.
   */
  field: ControllerRenderProps<TFieldValues> & FieldControlProps & { onFocus?: () => void };
  /**
   * Field state.
   */
  fieldState: ControllerFieldState;
};

export type FieldControlProps = {
  /**
   * Label displayed above the form field.
   */
  label?: string;
  /**
   * Sets the field as to appear disabled, users will not be able to interact with the text field.
   */
  isDisabled?: boolean;
  /**
   * Changes the text field to have a border indicating that its value is invalid.
   */
  isInvalid?: boolean;
  /**
   * If true, prevents the value of the input from being edited.
   */
  isReadOnly?: boolean;
  /**
   * Set required for form that the field is part of.
   */
  isRequired?: boolean;
};

export type FieldProps<TFieldValues extends FieldValues = FieldValues> = UseControllerProps<TFieldValues> &
  FieldControlProps & {
    children(methods: UseControllerReturn<TFieldValues>): React.ReactNode;
    isTextField?: boolean;
  };

const Field = <TFieldValues extends FieldValues>({
  children,
  control,
  defaultValue,
  isInvalid,
  isRequired,
  isTextField = true,
  name,
  rules,
  ...rest
}: FieldProps<TFieldValues>) => {
  // custom error to have more control of how to display it
  const [error, setError] = useState<FieldError>({
    message: '',
    type: '',
  });
  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    rules: { required: isRequired && 'This field is required', ...rules },
    defaultValue,
  });

  const required = !!rules?.required || isRequired;

  /**
   * if is not text field, like DOB Input, Selection Input - doesn't have onBlur event
   * so error never set
   * this sets error whenever found one
   */
  useEffect(() => {
    if (!isTextField && fieldState.error) {
      const { message, type } = fieldState.error;
      if (message) {
        setError({
          message,
          type,
        });
      }
    }
  }, [isTextField, fieldState.error]);

  /**
   * mode: onChange, display error while typing, to avoid this
   * we only show error when blur, if there is any
   */
  const enhanceOnBlur = () => {
    field.onBlur();
    const { message, type } = fieldState.error ?? { message: '', type: '' };
    if (message) {
      setError({
        message,
        type,
      });
    }
  };

  /**
   * hide error when focus, if there is any
   */
  const onFocus = () => {
    setError({
      message: '',
      type: 'pattern',
    });
  };

  return (
    <>
      {children({
        field: {
          ...field,
          isInvalid: error?.message !== '',
          isRequired: required,
          onBlur: enhanceOnBlur,
          onFocus,
          ...rest,
        },
        fieldState: { ...fieldState, error },
      })}
    </>
  );
};

export default Field;
