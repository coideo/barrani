import { action } from '@storybook/addon-actions';
import Button, { ButtonProps } from 'components/Button';
import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryString } from 'utils/use-query-string';
import Form from '.';
import { CheckboxProps } from './FieldCheckbox';

export default {
  title: 'Form',
  component: Form,
};

const KINDS = {
  primary: {
    bg: 'bg-indigo-600',
    button: 'text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-600',
    loading: 'bg-white',
  },
  secondary: {
    bg: 'bg-indigo-100',
    button: 'text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500 disabled:bg-indigo-100',
    loading: 'bg-indigo-700',
  },
  light: {
    bg: 'bg-white',
    button:
      'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-white',
    loading: 'bg-gray-700',
  },
};

const MyButton: FC<Omit<ButtonProps, 'kind'> & { kind?: keyof typeof KINDS }> = ({
  children,
  kind = 'primary',
  ...props
}) => (
  <Button className="focus:ring-indigo-500" kind={KINDS[kind]} {...props}>
    {children}
  </Button>
);

const SubmitButton = (props: ButtonProps) => (
  <Form.SubmitButton {...props}>
    {(rest) => <MyButton {...rest}>Guardar</MyButton>}
  </Form.SubmitButton>
);

const CancelButton = (props: ButtonProps) => (
  <Form.CancelButton {...props}>
    {(rest) => (
      <MyButton kind="light" {...rest}>
        Cancelar
      </MyButton>
    )}
  </Form.CancelButton>
);

export const Basic = () => {
  const methods = useForm();
  return (
    <div className="container max-w-md">
      <Form
        className="p-8 space-y-4 bg-gray-100 rounded-lg shadow"
        methods={methods}
        onSubmit={action('onSubmit')}
      >
        <Form.Text name="name" label="Nombre" required />
        <div className="flex justify-end space-x-3">
          <CancelButton />
          <SubmitButton />
        </div>
      </Form>
    </div>
  );
};

export const Login = () => {
  const methods = useForm();
  return (
    <div className="container max-w-md">
      <Form
        className="p-8 space-y-4 bg-gray-100 rounded-lg shadow"
        methods={methods}
        onSubmit={action('onSubmit')}
      >
        <Form.Email required />
        <Form.Password required />
        <div className="flex justify-end space-x-3">
          <CancelButton />
          <SubmitButton />
        </div>
      </Form>
    </div>
  );
};

const FormCheckbox = ({ ...props }: Omit<CheckboxProps, 'color'>) => (
  <Form.Checkbox color="focus:ring-indigo-500 text-indigo-600" {...props} />
);

const peopleList = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
  'Caroline Schultz',
  'Mason Heaney',
  'Claudie Smitham',
  'Emil Schaefer',
];

function usePeopleMatch() {
  const [queryString, search] = useQueryString({ name: '' });
  const name = queryString.name as string;

  return {
    people: useMemo(() => peopleList.filter((p) => p.toLowerCase().includes(name.toLowerCase())), [
      name,
    ]),
    search,
  };
}

export const General = () => {
  const methods = useForm({
    defaultValues: { country: 'Argentina', policy: false },
  });
  const { people, search } = usePeopleMatch();

  return (
    <div className="px-4 py-16 overflow-hidden bg-white sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Contact sales
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
            Sapien tortor lacus arcu.
          </p>
        </div>
        <div className="mt-12">
          <Form
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            methods={methods}
            onSubmit={action('onSubmit')}
          >
            <Form.Text name="firstName" label="First name" required />
            <Form.Text name="lastName" label="Last name" required />
            <Form.Email wrapperClass="sm:col-span-2" required />
            <Form.Select
              color="focus:ring-indigo-500 focus:border-indigo-500"
              name="country"
              label="Country / Region"
              required
              options={['Argentina', 'United States', 'Australia']}
              wrapperClass="sm:col-span-2"
            />
            <Form.Combobox
              label="Person"
              name="person"
              onSearch={(name) => search({ name })}
              required
              wrapperClass="sm:col-span-2"
            >
              {people &&
                (people.length > 0 ? (
                  <Form.Combobox.List>
                    {people.map((name) => (
                      <Form.Combobox.Item key={name} value={name}>
                        {name}
                      </Form.Combobox.Item>
                    ))}
                  </Form.Combobox.List>
                ) : (
                  <span className="block m-2">No results found</span>
                ))}
            </Form.Combobox>
            <Form.Text
              name="phone"
              label="Phone Number"
              tag="optional"
              placeholder="+1 (555) 987-6543"
              wrapperClass="sm:col-span-2"
            />
            <Form.TextArea
              name="message"
              label="Message"
              rows={4}
              tag="optional"
              wrapperClass="sm:col-span-2"
            />
            <div className="pt-4 space-y-3 border-t border-gray-200 sm:col-span-2">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  We&lsquo;ll always let you know about important changes, but you pick what else
                  you want to hear about.
                </p>
              </div>
              <FormCheckbox
                name="comments"
                label="Comments"
                help="Get notified when someones posts a comment on a posting."
                required
              />
              <FormCheckbox
                name="candidates"
                label="Candidates"
                help="Get notified when a candidate applies for a job."
              />
              <FormCheckbox
                name="offers"
                label="Offers"
                help="Get notified when a candidate accepts or rejects an offer."
              />
            </div>
            <Form.Switch.Group className="pt-4 border-t border-gray-200 sm:col-span-2">
              <Form.Switch
                name="policy"
                className="focus:ring-indigo-500"
                color={{ bg: 'bg-indigo-600', text: 'text-indigo-600' }}
              />
              <Form.Switch.Label className="text-base leading-6 text-gray-500">
                By selecting this, you agree to the Privacy Policy and Cookie Policy.
              </Form.Switch.Label>
            </Form.Switch.Group>
            <div className="sm:col-span-2">
              <SubmitButton block size="xl">
                Let&lsquo;s talk
              </SubmitButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
