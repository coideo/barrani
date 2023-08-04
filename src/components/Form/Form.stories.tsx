import { action } from "@storybook/addon-actions";
import Button, { ButtonProps } from "components/Button";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQueryString } from "utils/use-query-string";

import Form from ".";

export default {
  title: "Form",
  component: Form,
};

const SubmitButton = (props: ButtonProps) => (
  <Form.SubmitButton {...props}>{(rest) => <Button {...rest}>Guardar</Button>}</Form.SubmitButton>
);

const CancelButton = (props: ButtonProps) => (
  <Form.CancelButton {...props}>
    {(rest) => (
      <Button kind={Button.Kinds.light} {...rest}>
        Cancelar
      </Button>
    )}
  </Form.CancelButton>
);

export const Basic = () => {
  const methods = useForm({ defaultValues: { name: "" } });

  return (
    <div className="bg-gray-200 py-20 dark:bg-gray-900">
      <Form
        className="container max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-700"
        methods={methods}
        onSubmit={action("onSubmit")}
      >
        <div className="px-8 pt-8 pb-6">
          <Form.Text required label="Nombre" name="name" />
        </div>
        <div className="flex justify-end space-x-3 rounded-b-lg bg-gray-100 px-8 py-4 dark:bg-gray-800">
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
    <div className="bg-gray-300 py-20">
      <Form
        className="container max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg"
        methods={methods}
        onSubmit={action("onSubmit")}
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

const peopleList = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

function usePeopleMatch() {
  const [queryString, search] = useQueryString({ name: "" });
  const name = queryString.name;

  return {
    people: useMemo(
      () =>
        !name ? peopleList : peopleList.filter((p) => p.toLowerCase().includes(name.toLowerCase())),
      [name],
    ),
    search,
  };
}

const teamList = [
  { id: 1, name: "Real Madrid" },
  { id: 2, name: "Barcelona" },
  { id: 3, name: "Juventus" },
  { id: 4, name: "Milan" },
  { id: 5, name: "Manchester United" },
  { id: 6, name: "PSG" },
];

function useTeamMatch() {
  const [queryString, search] = useQueryString({ name: "" });
  const name = queryString.name;

  return {
    teams: useMemo(
      () =>
        !name
          ? teamList
          : teamList.filter((t) => t.name.toLowerCase().includes(name.toLowerCase())),
      [name],
    ),
    search,
  };
}

export const General = () => {
  const methods = useForm({
    defaultValues: { country: "Argentina", person: "", team: "", policy: false },
  });
  const { people, search } = usePeopleMatch();
  const { teams, search: teamSearch } = useTeamMatch();

  return (
    <div className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-xl">
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
            onSubmit={action("onSubmit")}
          >
            <Form.Text required label="First name" name="firstName" />
            <Form.Text required label="Last name" name="lastName" />
            <Form.Number required label="Edad" max={10} min={0} name="age" />
            <Form.Email required wrapperClass="sm:col-span-2" />
            <Form.Select
              required
              defaultValue="Argentina"
              displayValue={(value?: string) => value}
              label="Country / Region"
              name="country"
              options={["Argentina", "United States", "Australia"]}
              wrapperClass="sm:col-span-2"
              onChange={(value) => {
                // eslint-disable-next-line no-console
                console.log("country: ", value);
              }}
            />
            <Form.Combobox
              required
              displayValue={(name?: string) => name ?? ""}
              label="Person"
              name="person"
              wrapperClass="sm:col-span-2"
              onSearch={(name) => search({ name })}
            >
              {people.length > 0 ? (
                <Form.Combobox.List>
                  {people.map((name) => (
                    <Form.Combobox.Item key={name} value={name}>
                      {name}
                    </Form.Combobox.Item>
                  ))}
                </Form.Combobox.List>
              ) : (
                <span className="m-2 block">No results found</span>
              )}
            </Form.Combobox>
            <Form.Combobox
              required
              displayValue={(team?: typeof teams[number]) => team?.name ?? ""}
              label="Team"
              name="team"
              wrapperClass="sm:col-span-2"
              onSearch={(name) => teamSearch({ name })}
            >
              {teams.length > 0 ? (
                <Form.Combobox.List>
                  {teams.map(({ id, name }) => (
                    <Form.Combobox.Item key={id} value={{ id, name }}>
                      {name}
                    </Form.Combobox.Item>
                  ))}
                </Form.Combobox.List>
              ) : (
                <span className="m-2 block">No results found</span>
              )}
            </Form.Combobox>
            <Form.Text
              label="Phone Number"
              name="phone"
              placeholder="+1 (555) 987-6543"
              tag="optional"
              wrapperClass="sm:col-span-2"
            />
            <Form.TextArea
              label="Message"
              name="message"
              rows={4}
              tag="optional"
              wrapperClass="sm:col-span-2"
            />
            <div className="space-y-3 border-t border-gray-200 pt-4 sm:col-span-2">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  We&lsquo;ll always let you know about important changes, but you pick what else
                  you want to hear about.
                </p>
              </div>
              <Form.Checkbox
                required
                help="Get notified when someones posts a comment on a posting."
                label="Comments"
                name="comments"
              />
              <Form.Checkbox
                help="Get notified when a candidate applies for a job."
                label="Candidates"
                name="candidates"
              />
              <Form.Checkbox
                help="Get notified when a candidate accepts or rejects an offer."
                label="Offers"
                name="offers"
              />
            </div>
            <Form.Switch.Group className="border-t border-gray-200 pt-4 sm:col-span-2">
              <Form.Switch className="focus:ring-green-500" name="policy" />
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
