import { ButtonProps } from "components/Button";
import React, { BaseSyntheticEvent, FC, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  UnpackNestedValue,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { PartialBy } from "types";

import Field, { FieldProps, FieldComponentProps } from "./Field";
import FieldCheckbox from "./FieldCheckbox";
import FieldCombobox from "./FieldCombobox";
import FieldEmail from "./FieldEmail";
import FieldInput, { FieldInputProps } from "./FieldInput";
import FieldSelect from "./FieldSelect";
import FieldSwitch from "./FieldSwitch";
import FieldTextArea from "./FieldTextArea";

const FieldDate: FC<FieldProps & FieldInputProps> = (props) => (
  <FieldInput valueAsDate type="date" {...props} />
);

const FieldNumber: FC<FieldProps & FieldInputProps> = (props) => (
  <FieldInput valueAsNumber type="number" {...props} />
);

const FieldPassword: FC<PartialBy<FieldProps, "name"> & FieldInputProps> = (props) => (
  <FieldInput label="Contraseña" name="password" type="password" {...props} />
);

const FieldText: FC<FieldProps & FieldInputProps> = (props) => (
  <FieldInput type="text" {...props} />
);

const FieldURL: FC<FieldProps & FieldInputProps> = (props) => <FieldInput type="url" {...props} />;

type FormButton = FC<Omit<ButtonProps, "children"> & { children: FC<ButtonProps> }>;

const SubmitButton: FormButton = ({ children, disabled, loading, ...props }) => {
  const { formState } = useFormContext();
  const { isDirty, isSubmitting } = formState;

  return children({
    disabled: isSubmitting || (disabled !== undefined ? disabled : !isDirty),
    loading: loading ? isSubmitting || loading : isSubmitting,
    type: "submit",
    ...props,
  });
};

const CancelButton: FormButton = ({ children, disabled, onClick, ...props }) => {
  const { formState, reset } = useFormContext();
  const { isDirty, isSubmitting } = formState;

  return children({
    disabled: isSubmitting || (disabled !== undefined ? disabled : !isDirty),
    onClick: (evt) => {
      reset();
      onClick?.(evt);
    },
    ...props,
  });
};

export type FormProps<T> = {
  className?: string;
  children?: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (
    dirtys: UnpackNestedValue<T>,
    data: UnpackNestedValue<T>,
    event?: BaseSyntheticEvent,
  ) => void | Promise<void>;
};

const Form = <T extends FieldValues>({ className, children, methods, onSubmit }: FormProps<T>) => {
  const { formState, handleSubmit } = methods;
  const { dirtyFields } = formState;

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((v, e) => {
          const result = Object.fromEntries(
            Object.keys(dirtyFields).map((key) => [key, v[key]]),
          ) as UnpackNestedValue<T>;

          return onSubmit(result, v, e);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.CancelButton = CancelButton;
Form.Checkbox = FieldCheckbox;
Form.Combobox = FieldCombobox;
Form.Date = FieldDate;
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

export type { FieldProps, FieldComponentProps };
export default Form;
