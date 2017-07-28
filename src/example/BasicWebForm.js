// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { PragForm } from '../index';

const withPragForm = PragForm({
	initFields: () => ({ name: '', isHappy: '' }),
	validate,
	submit: data => {
		return new Promise(resolve => {
			console.log('Sending data', data); // eslint-disable-line no-console
			setTimeout(() => {
				resolve({ success: true });
			}, 1000);
		});
	},
});

const BasicWebForm = ({ form }) => (
	<form onSubmit={form.actions.onSubmit}>
		{form.state.hasErrors && (
			<div style={{ background: '#ff8787', border: '2px solid #d21111', color: '#8a0808', padding: '1em', marginBottom: 10 }}>
				{Object.keys(form.state.errors).map(key => <div key={key}><strong>{key}:</strong> {form.state.errors[key]}</div>)}
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
		<button type="submit" disabled={form.state.isLoading || form.state.hasErrors}>
			Submit
		</button>
	</form>
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

export default withPragForm(BasicWebForm);
