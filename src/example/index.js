// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import formCreate from '../index';

const MyFormComponent = ({ formActions, formFields, formState }) => (
	<form onSubmit={formActions.onSubmit}>
		<div>
			<label htmlFor="name">Pirate Name</label>
			<input
				type="text"
				name="name"
				value={formFields.name.value}
				onChange={formActions.updateField('name')}
			/>
		</div>
		<div>
			<label htmlFor="isPirate">Are you a pirate?</label>
			<label>
				<input
					type="radio"
					name="isPirate"
					value="yes"
					onChange={formActions.updateField('isPirate')}
					checked={formFields.isPirate.value === 'yes'}
				/>
				Yes
			</label>
			<label>
				<input
					type="radio"
					name="isPirate"
					value="no"
					onChange={formActions.updateField('isPirate')}
					checked={formFields.isPirate.value === 'no'}
				/>
				No
			</label>
			<label>
				<input
					type="radio"
					name="isPirate"
					value="maybe"
					onChange={formActions.updateField('isPirate')}
					checked={formFields.isPirate.value === 'maybe'}
				/>
				Maybe
			</label>
		</div>

		<div>
			{Object.keys(formFields).forEach(fieldName => (
				<code key={fieldName}>{JSON.stringify(formFields[fieldName])}</code>
			))}
		</div>
		<button type="submit" disabled={formState.isLoading || formState.isValid}>
			Away with ye!
		</button>
	</form>
);

MyFormComponent.propTypes = {
	formActions: PropTypes.object,
	formFields: PropTypes.object,
	formState: PropTypes.object,
};

function validate(data) {
	const errors = {};
	if (!data.name) {
		errors.name = 'All pirates require a name';
	}

	if (!data.isPirate) {
		errors.isPirate = 'We must know if ye be a pirate';
	} else if (data.isPirate === 'no') {
		errors.isPirate = 'You should become a pirate';
	} else if (data.isPirate === 'maybe') {
		errors.isPirate = 'Either you is or you is not a pirate';
	}
	return errors;
}

const Form = formCreate({
	initFields: () => ({ name: '', isPirate: '' }),
	validate,
	submit: data => {
		return new Promise(resolve => {
			console.log('Sending data', data); // eslint-disable-line no-console
			setTimeout(() => {
				resolve({ success: true });
			}, 1000);
		});
	},
})(MyFormComponent);

ReactDOM.render(<Form />, document.getElementById('App'));
