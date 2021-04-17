import { useMemo } from 'react';
import {
  DeepPartial,
  FieldValues,
  Mode,
  UnpackNestedValue,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';

type FormMutationOptions<
  TData,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'onSuccess'> &
  Partial<{
    defaultValues: UnpackNestedValue<DeepPartial<TVariables>>;
    mode: Mode;
    reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
    onSuccess?: (
      data: TData,
      variables: TVariables,
      methods: UseFormReturn<TVariables>
    ) => Promise<void> | void;
  }>;

type FormMutationResult<
  TData,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TContext = unknown
> = UseMutationResult<TData, TError, TVariables, TContext> & {
  methods: UseFormReturn<TVariables>;
};

function useFormMutation<
  TData,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  {
    defaultValues,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
    onSuccess,
    ...options
  }: FormMutationOptions<TData, TError, TVariables, TContext> = {}
): FormMutationResult<TData, TError, TVariables> {
  const methods = useForm<TVariables>({ defaultValues, mode, reValidateMode });

  const result = useMutation<TData, TError, TVariables, TContext>(mutationFn, {
    onSuccess: (data, variables) => onSuccess?.(data, variables, methods),
    ...options,
  });

  return useMemo(() => ({ ...result, methods }), [methods, result]);
}

export { useFormMutation };
