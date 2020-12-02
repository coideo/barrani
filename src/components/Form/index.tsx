import Button, { ButtonProps } from 'components/Button';
import React, { BaseSyntheticEvent, FC, ReactNode } from 'react';
import {
  DeepMap,
  FieldValues,
  FormProvider,
  UnpackNestedValue,
  useFormContext,
  UseFormMethods,
} from 'react-hook-form';
import { PartialBy } from 'types';
import Field, { FieldProps } from './Field';
import FieldCheckbox from './FieldCheckbox';
import FieldEmail from './FieldEmail';
import FieldInput, { FieldInputProps } from './FieldInput';
import FieldSelect from './FieldSelect';
import FieldSwitch from './FieldSwitch';
import FieldTextArea from './FieldTextArea';

const FieldNumber: FC<FieldProps & FieldInputProps> = (props) => (
  <FieldInput type="number" {...props} />
);

const FieldPassword: FC<PartialBy<FieldProps, 'name'> & FieldInputProps> = (props) => (
  <FieldInput type="password" name="password" label="Contraseña" {...props} />
);

const FieldText: FC<FieldProps & FieldInputProps> = (props) => (
  <FieldInput type="text" {...props} />
);

const FieldURL: FC<FieldProps & FieldInputProps> = (props) => <FieldInput type="url" {...props} />;

const SubmitButton: FC<ButtonProps> = ({ children = 'Guardar', disabled, loading, ...props }) => {
  const { formState } = useFormContext();
  const { isDirty, isSubmitting } = formState;
  return (
    <Button
      disabled={isSubmitting || (disabled !== undefined ? disabled : !isDirty)}
      loading={isSubmitting || loading}
      type="submit"
      {...props}
    >
      {children}
    </Button>
  );
};

const CancelButton: FC<ButtonProps> = ({ children = 'Cancelar', disabled, onClick, ...props }) => {
  const { formState, reset } = useFormContext();
  const { isDirty, isSubmitting } = formState;
  return (
    <Button
      disabled={isSubmitting || (disabled !== undefined ? disabled : !isDirty)}
      onClick={(evt) => {
        reset();
        onClick?.(evt);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

function filterDirty<T extends FieldValues>(
  dirtyFields: DeepMap<T, true>,
  value: UnpackNestedValue<T>
): UnpackNestedValue<T> {
  const result: FieldValues = {};
  Object.keys(dirtyFields).forEach((key) => {
    result[key] = value[key];
  });
  return result as UnpackNestedValue<T>;
}

type FormProps<T> = {
  className?: string;
  children?: ReactNode;
  methods: UseFormMethods<T>;
  onSubmit: (
    dirtys: UnpackNestedValue<T>,
    data: UnpackNestedValue<T>,
    event?: BaseSyntheticEvent
  ) => void | Promise<void>;
};

const Form = <T extends FieldValues>({ className, children, methods, onSubmit }: FormProps<T>) => {
  const { formState, handleSubmit } = methods;
  const { dirtyFields } = formState;

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit((v, e) => onSubmit(filterDirty(dirtyFields, v), v, e))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.CancelButton = CancelButton;
Form.Checkbox = FieldCheckbox;
Form.Email = FieldEmail;
Form.Field = Field;
Form.Number = FieldNumber;
Form.Password = FieldPassword;
Form.Select = FieldSelect;
Form.SubmitButton = SubmitButton;
Form.Switch = FieldSwitch;
Form.Text = FieldText;
Form.TextArea = FieldTextArea;
Form.URL = FieldURL;

export default Form;
