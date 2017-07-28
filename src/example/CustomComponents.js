// @flow
import React from 'react';
import { formCreate } from '../index';
import TextInput from './components/TextInput';

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;

const CustomComponents = ({ formFieldProps, formActions }) => (
	<form onSubmit={formActions.onSubmit}>
		<h3>Testing</h3>
		<TextInput
			{...formFieldProps({ name: 'email', type: 'email' })}
		/>
		<button type='submit'>GO</button>
	</form>
);

function validate (fields) {
	const errors = {};
	if (!emailRegex.test(fields.email)) {
		errors.email = "Please enter a vlid email address";
	}
	
	return errors;
}

export default formCreate({
	initFields: () => ({ email: '' }),
	submit: (values) => { console.log(values) },
	validate,
})(CustomComponents);
