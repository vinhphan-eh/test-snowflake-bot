import React from 'react';
import type { UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

/**
 * A form allows users to input information.
 */

export interface FormProps<TFormValues extends FieldValues> extends UseFormProps<TFormValues> {
  /**
   * The contents rendered inside of the form. This is a function where the props will be passed from the form. The function props you can access are dirty, submitting and disabled.
   */
  children(methods: UseFormReturn<TFormValues>): React.ReactNode;
}

const Form = <TFormValues extends FieldValues>({ children, ...props }: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...props, mode: 'onChange' });

  return <>{children(methods)}</>;
};

export default Form;
