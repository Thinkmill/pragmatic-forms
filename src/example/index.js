// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { formCreate } from '../index';

const MyFormComponent = ({ formActions, formFields, formState, formInputProps }) => (
	<form onSubmit={formActions.onSubmit}>
		<div>
			<label htmlFor="name">Pirate Name</label>
			<input
				id="name"
				placeholder="eg. Blackbeard"
				{...formInputProps('name')}
			/>
		</div>
		<div>
			<label htmlFor="isPirate">Are you a pirate?</label>
			<label>
				<input {...formInputProps('isPirate', 'radio', 'yes')} />
				Yes
			</label>
			<label>
				<input {...formInputProps('isPirate', 'radio', 'no')} />
				No
			</label>
			<label>
				<input {...formInputProps('isPirate', 'radio', 'maybe')} />
				Maybe
			</label>
		</div>
		<button type="submit" disabled={formState.isLoading || formState.hasErrors}>
			Away with ye!
		</button>


		<div>
			<div>
				<h3>Form Fields</h3>
				<pre><code>{JSON.stringify(formFields)}</code></pre>
			</div>
			<div>
				<h3>Form state</h3>
				<pre><code>{JSON.stringify(formState)}</code></pre>
			</div>
		</div>
	</form>
);

MyFormComponent.propTypes = {
	formActions: PropTypes.objectOf(PropTypes.func),
	formFields: PropTypes.object,
	formState: PropTypes.object,
	formInputProps: PropTypes.func,
};

function validate(data) {
	const errors = {};
	
	if (!data.name) {
		errors.name = 'All pirates require a name';
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

ReactDOM.render(<Form />, document.getElementById('app'));
