import { action } from '@storybook/addon-actions';
import React from 'react';
import { useForm } from 'react-hook-form';
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
  light: {
    bg: 'bg-white',
    button:
      'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-white',
    loading: 'bg-gray-700',
  },
};

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
          <Form.CancelButton kind={KINDS.light} />
          <Form.SubmitButton kind={KINDS.primary} />
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
          <Form.CancelButton kind={KINDS.light} />
          <Form.SubmitButton kind={KINDS.primary} />
        </div>
      </Form>
    </div>
  );
};

const FormCheckbox = ({ ...props }: Omit<CheckboxProps, 'color'>) => (
  <Form.Checkbox color="focus:ring-indigo-500 text-indigo-600" {...props} />
);

export const General = () => {
  const methods = useForm({ defaultValues: { country: 'Argentina' } });
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
              options={['Argentina', 'United States', 'Australia'].map((p) => ({ id: p, name: p }))}
              wrapperClass="sm:col-span-2"
            />
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
              <Form.SubmitButton kind={KINDS.primary} block size="xl">
                Let&lsquo;s talk
              </Form.SubmitButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};