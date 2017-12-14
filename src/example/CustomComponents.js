// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { configureForm } from '../index';
import TextInput from './components/TextInput';

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+/gi;

const CustomComponents = ({ form }) => (
	<form.Form noValidate>
		<h3>Testing</h3>
		<TextInput
			{...form.getFieldProps({ name: 'email', type: 'email' })}
		/>
		<button type='submit'>GO</button>
	</form.Form>
);
CustomComponents.propTypes = {
	form: PropTypes.shape({
		getFieldProps: PropTypes.func,
		action: PropTypes.object,
	})
}

function validate (fields) {
	const errors = {};
	if (!emailRegex.test(fields.email)) {
		errors.email = "Please enter a valid email address";
	}
	return errors;
}

export default configureForm({
	initFields: () => ({ email: '' }),
	onChange: (formData, props) => {
		props.onFormStateChange(formData);
	},
	submit: (values) => {
		console.log(values); // eslint-disable-line no-console
	},
	validate,
})(CustomComponents);
