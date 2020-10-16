import {
  DeepPartial,
  FieldValues,
  Mode,
  UnpackNestedValue,
  useForm,
  UseFormMethods,
} from 'react-hook-form';
import {
  MutateFunction,
  MutationConfig,
  MutationFunction,
  MutationResult,
  useMutation,
} from 'react-query';

type FormMutationOptions<
  TResult,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TSnapshot = unknown
> = Omit<MutationConfig<TResult, TError, TVariables, TSnapshot>, 'onSuccess'> &
  Partial<{
    defaultValues: UnpackNestedValue<DeepPartial<TVariables>>;
    mode: Mode;
    reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
    onSuccess?: (
      data: TResult,
      variables: TVariables,
      methods: UseFormMethods<TVariables>
    ) => Promise<unknown> | void;
  }>;

type FormMutationResult<
  TResult,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TSnapshot = unknown
> = [
  MutateFunction<TResult, TError, TVariables, TSnapshot>,
  MutationResult<TResult, TError> & { methods: UseFormMethods<TVariables> }
];

function useFormMutation<
  TResult,
  TError = unknown,
  TVariables extends FieldValues = FieldValues,
  TSnapshot = unknown
>(
  mutationFn: MutationFunction<TResult, TVariables>,
  {
    defaultValues,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
    onSuccess,
    ...options
  }: FormMutationOptions<TResult, TError, TVariables, TSnapshot> = {}
): FormMutationResult<TResult, TError, TVariables> {
  const methods = useForm<TVariables>({ defaultValues, mode, reValidateMode });

  const [mutate, result] = useMutation<TResult, TError, TVariables, TSnapshot>(mutationFn, {
    onSuccess: (data, variables) => onSuccess?.(data, variables, methods),
    ...options,
  });

  return [mutate, { ...result, methods }];
}

export { useFormMutation };
