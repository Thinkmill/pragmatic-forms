# Pragmatic Forms
A pragmatic approach to forms in React (Web and Native)

# Goals
- be simple
- be declarative
- be un-magical
- be performant
- be just react (and modern JS)
- work with YOUR state management library
- work in browser and react-native

Example usage:

```js
import { configureForm } from '@thinkmill/pragmatic-forms';

const withForm = configureForm({
	initFields: (props) => ({
		name: props.name || '',
		agree: false,
	}),
	validate: ({ name, agree }, props) => {
		const errors = {};
		if (!name) errors.name = 'Please enter a name';
		else if (name === props.name) {
			errors.name = `Name must be changed to something other than ${props.name}`;
		}
		if (!agree) errors.agree = 'You must agree to the conditions';

		return errors;
	},
	submit: (formData) => {
		return fetch('/registration', {
			method: 'POST',
			body: JSON.stringify(formData),
		})
		.then(res => res.json());
	}
});

const RegistrationForm = ({ form }) => (
	<form onSubmit={form.onSubmit}>
		{!form.hasErrors && 
			<div>
				<p style={{ color: 'red' }}>Please correct the your input</p>
			</div>
		}

		<input {...form.getInputProps({ name: 'name', type: 'text' })} />
		<input {...form.getInputProps({ name: 'agree', type: 'checkbox' })} />
	
		<button
			type="submit"
			disabled={form.hasErrors || form.isLoading}
		>
			Submit
		</button>
	</form>
);

export default withForm(RegistrationForm);

```

# The Road to release

- [ ] Track input focus in internal state (field.hasFocus)
- [ ] Test with and create examples for React Native
- [x] Export form props like field props ie. `form.getFormProps()`
- [x] Export a `Form` component which can be used in place of `<form />` and doesn't require setting up props.

# API Documentation

When working with `pragmatic-forms` you will be interacting with either the
`configureForm` method or the `form` prop passed to your component.

## `configureForm: function(options:Object)`

The `pragmatic-forms` module exports a single named function: `configureForm`. This method creates a configured Higher Order Component to wrap a form providing state and event handlers through a single prop named `form`.

`configureForm` accepts an options object and returns a method for creating a higher order component which will wrap your form to provide state and event handlers.

- `initFields: Function`
- `submit: Function`
- `validate?: Function`
- `onSuccess?: Function`
- `onError?: Function`
- `onFirstInteraction?: Function`

### `initFields: Function(props):  { [fieldName: string]: any }`
**required**

The `initFields` method will receive props as it's only argument. This method should return an object with key/value pairs that provide the default value for each form field in your form.

> Tip: This is a good place to set a default value for a field to avoid the react warning "changing an uncontrolled input of type text to be controlled".

eg.
```js
const withForm = configureForm({
	initFields: (props) => ({
		name: props.name || '',
		email: props.email || '',
	}),
	...
});
```

### `submit: Function(formData, props, formProps): Promise`
**required**

The `submit` method will be called with `formData`, `props` and `formProps` and should return a promise.

eg. Trigger a `graphql` mutation using `react-apollo`
```js
import { graphql, gql, compose} from 'react-apollo';
import { configureForm } from 'pragmatic-forms';

const query = gql`
mutation createUser (
	$name: String!
	$email: String!
) {
	createUser (user: {
		name: $name
		email: $email
	})
	{
		id
	}
}
`;

export const MyForm = compose(
	graphql(query),
	configureForm({
		initFields: () => ({ name: '', email: '' }),
		submit: (formData, props) => {
			return props.mutate({
				variables: {
					name: formData.name,
					email: formData.email, 
				},
			});
		}
	})
)(({ form }) => (
	<form onSubmit={form.onSubmit}>
		{'...'}
	</form>
));
```

### `validate?: Function(formData, props, formProps): { [fieldName: string]: any }`
_optional_

The `validate` method receives `formData`, `props` and `props` and returns a map (Object) of errors keyed by the relevant fieldName.

eg.
```js
const withForm = configureForm({
	initFields: () => ({ email: '' }),
	submit: (formData) => console.log(formData),
	validate: (formData, props) => {
		const errors = {};
		if (!formData.email.includes('@')) {
			errors.email = 'Please enter a valid email address';
		}
		return errors;
	},
});
```

### `onSuccess?: Function(results, props, formProps): void`
_optional_

The `onSuccess` method is called after `submit` has **resolved**, the form state has been update and `setState` has been called.

It receives the result of the `submit` method, `props` and `formProps` as arguments.

### `onError?: Function`
_optional_

The `onError` method is called after `submit` has **rejected**, the form state has been update and `setState` has been called.

It receives the rejection reason of the `submit` method `props` and `formProps` as arguments.

### `onChange?: Function(formData, props, formProps): void`
_optional_

The `onChange` method is called after the internal `setState` is complete when any form field has fired it's `onChange` or `onValueChange` event.

It receives the complete `formData` object, `props` and `formProps` as arguments.

### `onFirstInteraction?: Function(formData, props, formProps): void`
_optional_

The `onFirstInteraction` method is called when a form fields `onChange` handler is triggered.

It receives the current `formData`, `props` and `formProps`.

## The `form` Prop
**aka `formProps`**

The `form` prop provides access to the `state` and `methods` provided by `pragmatic-forms` inside your component. The same object is also passed as the last parameter to each of the `configureForm` methods (excluding `initFields`).

### `form.isLoading: boolean`

`true` if the submit method has been called and the promise has not resolved or rejected. Otherwise `false`

### `form.isPristine: boolean`

`true` until a `change` event is triggered on one or more of the forms inputs.

### `form.submitError: any`

`submitError` is populated with the rejection `reason` if the form submit Promise is `rejected`.

### `form.submitResult: any`

`submitResult` is populated with the resolve value (if any) if the form submit Promise us `resolved`.

### `form.errors: { [fieldName: string]: any }`

Key-value pairs giving the validation errors for each field by field name.
The `value` will be whatever was returned in the validation method.

### `form.hasErrors: boolean`

`true` if the validate method returned an `error` object with at least one property.

### `form.fields: Object`

Provides access to the form fields as they are stored internally in `pragmatic-forms`.

Each field will have the following shape:

```js
[fieldName: string]: {
	value: 'field value', // :any - whatever you put in here.
	isDirty: false, // Boolean - has the field been modified
	error: 'some error', // ?String - a field level error message (provided by the `validate` method)
}
```

### `form.submit: Function(): void`

Calling `form.submit` will trigger the submit handler directly.

Use cases:
- have a form which is not wrapped in a form tag
- trigger form submission programatically (eg. on a timer)

eg. Create a delete button

```js
const withForm = configureForm({
	initFields: (props) => ({ id: props.id }),
	submit: ({ id }) => {
		return fetch(`/item/${id}`, { method: 'delete' });
	}
})

const DeleteBtn = withForm(({ form }) => (
	<button
		type="button"
		onClick={form.submit}
		disabled={form.isLoading}
	>
		Delete me
	</button>
));
```

### `form.reset: Function() :void`

Calling `form.reset` will reset the form to it's original state.

### `form.onSubmit: Function(event?: any) :void`

The `submit` event handler. This should be passed as `onSubmit` to a `<form>` component.

eg.
```js
const withForm = configureForm({ ... });
const MyForm = withForm(({ form }) => (
	<form onSubmit={form.onSubmit}>
		...
		<button type="submit">Submit</button>
	</form>
));
```

### `form.onReset: Function(event?: any) :void`

The `reset` event handler. This should be passed as `onReset` to a `<form>` component. When the `reset` event is triggered, the form will be reset to it's original state.

eg.
```js
const withForm = configureForm({ ... });
const MyForm = withForm(({ form }) => (
	<form onReset={form.onReset}>
		...
		<button type="reset">Reset</button>
	</form>
));
```

### `form.updateField: Function(name:String, value:any) :void`

Directly update the value of a field by name.

### `form.getInputProps: Function(options): InputProps`

Returns an object with props which can be passed to an `input` component.

> NOTE: For checkboxes it is important to provide the correct type. ie. 'checkbox'. This allows the onChange event handler to check the checked state of the input rather than reading the value.

#### `options`
 - `name: string`
 - `type?: string` Defaults to `"text"`
 - `value?:any` TODO: Requires explanation.
 - `checked?: boolean` Whether a checkbox is checked. Defaults to `false`
 - `forceType?: 'string' | 'number' | 'boolean'` undefined by default.

If `forceType` is true, pragmatic-forms will attempt to maintain the primitive type of the initial value of a field. For example, if `initFields` returns a `boolean` for the field `isEnabled` and `onChange` is called with a `string` it will attempt to convert that string back to a boolean. This can be helpful when your Input component converts the value field type to a string.

Currently `forceType` supports `string`, `number` and `boolean`.

#### `InputProps`
 - `disabled: boolean` `true` while the form `isLoading`
 - `name: string` whatever was provided in `options`.
 - `type: string` whatever was provided in `options`. Defaults to `text`
 - `onChange: (event) => void` a change handler
 - `checked: boolean` Only for a `checkbox` or `radio`
 - `value` Not provided for a `checkbox`.

### `form.getFieldProps: Function(options): FieldProps`

Takes the same options as `form.getInputProps`.

In addition to the props provided by `form.getInputProps` this method also returns props which can be used to show more information on a custom component.

 - `error?: string` Either a string error message or `null` if there is no error.
 - `isDirty: boolean` `true` when the field has been modified.
 - `onValueChange: (value: any) =>` a special change handler which accepts the value directly rather than via a change event.

### `state` (Deprecated)

> `state` has been deprecated in favour of having all props available on the top level `form` object.

Contains the form state fields defined above
 - `isLoading`
 - `isPristine`
 - `hasErrors`
 - `errors`
 - `submitError`
 - `submitResult`

### `actions` (Deprecated)

> `actions` has been deprecated in favour of having all props available on the top level `form` object.

Contains the following form `methods` and `event handlers` defined above:
 - `submit`
 - `onSubmit`
 - `reset`
 - `onReset`

### Reference material and prior art

Many of the ideas in here are not new. This is a list of some of the places I have taken inspiration from.

- https://github.com/jaredpalmer/formik
- http://redux-form.com/
