# Pragmatic Form
A pragmatic approach to forms in React (Web and Native)

# Goals
- be simple
- be declarative
- be un-magical
- be just react (and modern JS)
- work with YOUR state management library
- work in browser and react-native

Example usage:

```js
import PragForm from 'pragmatic-form';

const withPragForm = PragForm({
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
	<form onSubmit={form.actions.onSubmit}>
		{!form.state.hasErrors && 
			<div>
				<p style={{ color: 'red' }}>Please correct the your input</p>
			</div>
		}

		<input
			{...form.getInputProps({ name: 'name', type: 'text' })}
		/>
		
		<input
			{...form.getInputProps({ name: 'agree', type: 'checkbox' })}
		/>
	
		<button
			type="submit"
			disabled={form.state.hasErrors || form.state.isLoading}
		>
			Submit
		</button>
	</form>
);

export default withPragForm(RegistrationForm);

```





### Reference material and prior art

Many of the ideas in here are not new. This is a list of some of the places I have taken inspiration from.

https://github.com/jaredpalmer/formik
http://redux-form.com/
