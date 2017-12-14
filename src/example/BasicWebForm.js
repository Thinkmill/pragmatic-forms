// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { configureForm } from '../index';

const withForm = configureForm({
	initFields: () => ({ name: '', isHappy: '', month: '' }),
	validate,
	submit: data => {
		return new Promise(resolve => {
			console.log('Sending data', data); // eslint-disable-line no-console
			setTimeout(() => {
				resolve({ success: true });
			}, 1000);
		});
	},
	onChange: (formData, props) => {
		props.onFormStateChange(formData);
	},
});

const BasicWebForm = ({ form }) => (
	<form.Form>
		{form.hasErrors && (
			<div style={{ background: '#ff8787', border: '2px solid #d21111', color: '#8a0808', padding: '1em', marginBottom: 10 }}>
				{Object.keys(form.errors).map(key => <div key={key}><strong>{key}:</strong> {form.errors[key]}</div>)}
			</div>
		)}

		<div style={{ marginBottom: 10 }}>
			<label htmlFor="name">Name</label>
			<input
				id="name"
				placeholder="eg. Borico Jones"
				{...form.getInputProps({ name: 'name' })}
			/>
		</div>
		<div style={{ marginBottom: 10 }}>
			<label htmlFor="isHappy">Are you happy?</label>
			<label>
				<input {...form.getInputProps({ name: 'isHappy', type: 'radio', value: 'yes' })} />
				Yes
			</label>
			<label>
				<input {...form.getInputProps({ name: 'isHappy', type: 'radio', value: 'no' })} />
				No
			</label>
			<label>
				<input {...form.getInputProps({ name: 'isHappy', type: 'radio', value: 'maybe' })} />
				Maybe
			</label>
		</div>
		<div>
			<label htmlFor="month">Month</label>
			<input {...form.getInputProps({ name: 'month', type: 'text', value: '' })} />
		</div>
		<button type="submit" disabled={form.isLoading || form.hasErrors}>
			Submit
		</button>
		<button type="reset" disabled={form.isLoading || form.hasErrors}>
			Reset
		</button>
	</form.Form>
);

BasicWebForm.propTypes = {
	form: PropTypes.shape({
		actions: PropTypes.objectOf(PropTypes.func),
		fields: PropTypes.object,
		state: PropTypes.object,
		getInputProps: PropTypes.func,
	}),
};

function validate(data) {
	const errors = {};

	if (!data.name) {
		errors.name = 'We must have a name';
	}

	if (!data.isHappy) {
		errors.isHappy = 'Please let us know if you are happy';
	} else if (data.isHappy !== 'yes') {
		errors.isHappy = 'You should be happy';
	}

	return errors;
}

export default withForm(BasicWebForm);
