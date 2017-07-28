// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { formCreate } from '../index';

const BasicWebForm = ({ formActions, formState, formInputProps }) => (
	<form onSubmit={formActions.onSubmit}>
		{formState.hasErrors && (
			<div style={{ background: '#ff8787', border: '2px solid #d21111', color: '#8a0808', padding: '1em', marginBottom: 10 }}>
				{Object.keys(formState.errors).map(key => <div key={key}><strong>{key}:</strong> {formState.errors[key]}</div>)}
			</div>
		)}

		<div style={{ marginBottom: 10 }}>
			<label htmlFor="name">Pirate Name</label>
			<input
				id="name"
				placeholder="eg. Blackbeard"
				{...formInputProps({ name: 'name' })}
			/>
		</div>
		<div style={{ marginBottom: 10 }}>
			<label htmlFor="isPirate">Are ye a pirate?</label>
			<label>
				<input {...formInputProps({ name: 'isPirate', type: 'radio', value: 'yes' })} />
				Ei
			</label>
			<label>
				<input {...formInputProps({ name: 'isPirate', type: 'radio', value: 'no' })} />
				Ne
			</label>
			<label>
				<input {...formInputProps({ name: 'isPirate', type: 'radio', value: 'maybe' })} />
				Perhaps
			</label>
		</div>
		<div>
			<label htmlFor="month">Month</label>
			<input {...formInputProps({ name: 'month', type: 'month' })} />
		</div>
		<button type="submit" disabled={formState.isLoading || formState.hasErrors}>
			Away with ye!
		</button>
	</form>
);

BasicWebForm.propTypes = {
	formActions: PropTypes.objectOf(PropTypes.func),
	formFields: PropTypes.object,
	formState: PropTypes.object,
	formInputProps: PropTypes.func,
};

function validate(data) {
	const errors = {};
	
	if (!data.name) {
		errors.name = 'All pirates must \'av a name';
	}

	if (!data.isPirate) {
		errors.isPirate = 'We must know if ye be a pirate';
	} else if (data.isPirate === 'no') {
		errors.isPirate = 'Ye should endevour to become a pirate';
	} else if (data.isPirate === 'maybe') {
		errors.isPirate = 'Either ye be or you be not a pirate';
	}

	return errors;
}

export default formCreate({
	initFields: () => ({ name: '', isPirate: '', month: '' }),
	validate,
	submit: data => {
		return new Promise(resolve => {
			console.log('Sending data', data); // eslint-disable-line no-console
			setTimeout(() => {
				resolve({ success: true });
			}, 1000);
		});
	},
})(BasicWebForm);
