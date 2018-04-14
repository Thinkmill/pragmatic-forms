// @flow
import React from "react";
import PropTypes from "prop-types";
import { configureForm } from "../index";

const withForm = configureForm({
	initFields: () => ({ name: "", cv: null }),
	validate,
	submit: data => {
		// Note, with File inputs you usually want to upload your data back
		// to your server encoded as a multipart/form-data encoded payload.
		// You can do this with the FormData API.
		// Here's an example of how this would look
		//
		// const formData = new FormData();

		// for (const key of Object.keys(data)) {
		// 	formData.append(key, formData[key]);
		// }

		// fetch('/some-url', {
		// 	method: 'POST',
		// 	body: formData
		// })
		// .then(response => response.json())
		// .catch(error => console.error('Error:', error))
		// .then(response => console.log('Success:', response));

		return new Promise(resolve => {
			console.log("Sending data", data); // eslint-disable-line no-console
			setTimeout(() => {
				resolve({ success: true });
			}, 1000);
		});
	},
	onChange: (formData, props) => {
		props.onFormStateChange(formData);
	}
});

const FileInputForm = ({ form }) => (
	<form.Form>
		{form.hasErrors && (
			<div
				style={{
					background: "#ff8787",
					border: "2px solid #d21111",
					color: "#8a0808",
					padding: "1em",
					marginBottom: 10
				}}
			>
				{Object.keys(form.errors).map(key => (
					<div key={key}>
						<strong>{key}:</strong> {form.errors[key]}
					</div>
				))}
			</div>
		)}

		<div style={{ marginBottom: 10 }}>
			<label htmlFor="name">Name</label>
			<input
				id="name"
				placeholder="eg. Borico Jones"
				{...form.getInputProps({ name: "name" })}
			/>
		</div>
		<div style={{ marginBottom: 10 }}>
			<label htmlFor="cv">Select a file</label>
			<label>
				<input
					{...form.getInputProps({
						name: "cv",
						type: "file"
					})}
				/>
			</label>
		</div>
		<button type="submit" disabled={form.isLoading || form.hasErrors}>
			Submit
		</button>
		<button type="reset" disabled={form.isLoading || form.hasErrors}>
			Reset
		</button>
	</form.Form>
);

FileInputForm.propTypes = {
	form: PropTypes.shape({
		actions: PropTypes.objectOf(PropTypes.func),
		fields: PropTypes.object,
		state: PropTypes.object,
		getInputProps: PropTypes.func
	})
};

function validate(data) {
	const errors = {};

	if (!data.name) {
		errors.name = "We must have a name";
	}

	if (!data.cv) {
		errors.cv = "Please select a file";
	}

	return errors;
}

export default withForm(FileInputForm);
