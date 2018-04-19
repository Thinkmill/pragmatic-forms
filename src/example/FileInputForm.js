// @flow
import React from "react";
import PropTypes from "prop-types";
import { configureForm } from "../index";

const formatFileForJSON = (file) => {
	if (!file) return null;
	return {
		name: file.name,
		lastModified: file.lastModified,
		size: file.size,
		type: file.type,
	};
}

const withForm = configureForm({
	initFields: () => ({ name: "", cv: null, attachments: [] }),
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
		// File objects don't get serialised nicely into JSON but we need
		// to keep them in state so people can work with them.

		// Make a copy so we don't mutate our state.
		const { cv, attachments, name } = formData;

		props.onFormStateChange({
			name,
			cv: formatFileForJSON(cv),
			attachments: Array.from(attachments, formatFileForJSON),
		});
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
		<div style={{ marginBottom: 10 }}>
			<label htmlFor="cv">Select multiple files</label>
			<label>
				<input
					{...form.getInputProps({
						name: "attachments",
						type: "file",
						multiple: true,
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

		<p>
			Note that File Inputs work differently to other input types and do
			not easily serialise as shown below. See the source of this example
			for how to work with file inputs.
		</p>

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

	if (!data.attachments.length) {
		errors.attachments = "Please add at lease one attachment";
	}

	return errors;
}

export default withForm(FileInputForm);
