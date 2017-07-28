# Pragmatic Form
A pragmatic approach to forms in React (Web and Native)

Example usage:

```js
import PragForm from 'pragmatic-form';

const MyForm = ({ formState, formFields, formActions }) => (
	<form onSubmit={formActions.onSubmit}>
		{!formState.isValid && 
			<div>
				<p style={{ color: 'red' }}>Please correct the things</p>
			</div>
		}

		<input
			type="text"
			name="name"
			value={formFields['name'].value}
			onChange={formActions.updateField('name')}
			style={{
				border: '1px solid',
				borderColor: formFields['name'].hasError ? 'red' : 'blue',
			}}
		/>
		
		<input
			type="checkbox"
			name="agree"
			checked={formState['agree'].checked}
			onChange={formActions.updateCheck('agree')}
		/>
	
		<button
			type="submit"
			disabled={!formState.isValid && !formState.isLoading}
		>
			Submit
		</button>
	
	</form>
);

function initFields (props) {
	const { previousName } = props;
	return {
		name: previousName || '',
		agree: false,
	};
}

function validate (data, props) {
	const { name, agree } = data;
	const errors = {};
	
	// name is required
	if (name.trim().length === 0) {
		errors.name = 'Please enter a name';
	}
	// name must be different to previous name
	else if (name.trim().toLowerCase() === props.name.toLowerCase()) {
		errors.name = `Name must be changed to something other than ${props.name}`;
	}
	
	if (!agree) {
		errors.agree = 'You must agree to the conditions';
	}
	
	return errors;
}

function submit (formData, props) {
	return fetch('/registration', {
		method: 'POST',
		body: JSON.stringify(formData),
	})
	.then(res => res.json());
}

export default PragForm({
	initFields,
	validate,
	submit,
})(MyForm);

```
