// @flow
import React, { Component } from 'react';

const initialiseFormFields = (initialData: { [string]: any }) => {
	return Object.keys(initialData).reduce((acc, key) => {
		acc[key] = {
			value: initialData[key],
			isDirty: false,
			error: undefined,
		};
		return acc;
	}, {});
}

const updateFormFieldErrors = (state, errors) => {
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = {
			...state[key],
			error: errors[key],
		};
		return acc;
	}, {});
};

function hasErrors(errorObj): boolean {
	return Object.keys(errorObj).length > 0;
}

const getFormFieldsValues = (state) => { 
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = state[key].value;
		return acc;
	}, {});
};

const getFormFieldsErrors = (fields): { [string]: string } => {
	return Object.keys(fields).reduce((acc, key) => {
		if (fields[key].error) {
			acc[key] = fields[key].error;
		}
		return acc;
	}, {});
};

export function formCreate ({
	initFields,
	submit,
	validate = () => ({}),
	onSuccess = () => {},
	onError = () => {},
}: {
	initFields: Function,
	validate: Function,
	submit: Function,
	onSuccess?: Function,
	onError?: Function,
}) {

	return function decorator (WrappedComponent: any) {
		return class PragForm extends Component {

			state = {
				formFields: {},
				isLoading: false,
				submitResult: undefined,
				submitError: undefined,
			}
			
			fieldProps = {}

			constructor(props: any, context: any) {
				super(props, context);
				const initialData = initFields(props);
				this.state = {
					formFields: initialiseFormFields(initialData, {}),
					submitResult: undefined,
					submitError: undefined,
					isLoading: false,
				};
			}

			_update = (name: string, value: any) => {
				const { formFields } = this.state;
				this.setState({
					formFields: {
						...formFields,
						[name]: {
							value,
							error: undefined,
							isDirty: true,
						},
					},
					submitError: undefined,
				});
			}

			updateInput = (name: string) => (event: any) => {
				this._update(name, event.currentTarget.value);
			};

			updateCheck = (name: string) => (event: any) => {
				this._update(name, event.currentTarget.checked);
			};

			formInputProps = (name: string, type: string = 'text', value: any) => {
				if (!this.fieldProps[name]) {
					this.fieldProps[name] = {
						name,
						type,
						onChange: (type === 'checkbox') ? this.updateCheck(name) : this.updateInput(name),
					};
				}

				switch (type) {
					case 'checkbox': 
						return Object.assign(this.fieldProps[name], {
							checked: this.state.formFields[name].value,
						});
					case 'radio':
						return Object.assign(this.fieldProps[name], {
							checked: this.state.formFields[name].value === value,
							value,
						});
					default:
						return Object.assign(this.fieldProps[name], {
							value: this.state.formFields[name].value,
						});
				}
			}

			formFieldProps = (name: string, type: string = 'text') => {
				const inputProps = this.formInputProps(name, type);
				const fieldState = this.state.formFields[name];

				return Object.assign(inputProps, {
					error: fieldState.error,
					isDirty: fieldState.isDirty,
				});
			}

			handleSubmit = async (event: any) => {
				event.preventDefault();

				const formData = getFormFieldsValues(this.state.formFields); 
				const errors = validate(formData);

				if (hasErrors(errors)) {
					return this.setState({
						formFields: updateFormFieldErrors(this.state.formFields, errors),
					});
				}

				this.setState({
					isLoading: true,
				});

				try {
					const result = await submit(formData, this.props);
					this.setState({
						isLoading: false,
						submitResult: result,
					});
					return onSuccess(result, this.props);
				} catch (reason) {
					this.setState({
						isLoading: false,
						submitError: reason,
					});
					return onError(reason, this.props);
				}
			};

			render() {
				const errors = getFormFieldsErrors(this.state.formFields);
				const formState = {
					isLoading: this.state.isLoading,
					hasErrors: hasErrors(errors),
					submitError: this.state.submitError,
					submitResult: this.state.submitResult,
					errors,
				};

				return (
					<WrappedComponent
						{...this.props}
						formState={formState}
						formFields={this.state.formFields}
						formActions={{
							onSubmit: this.handleSubmit,
							updateInput: this.updateInput,
							updateCheck: this.updateCheck,
						}}
						formFieldProps={this.formFieldProps}
						formInputProps={this.formInputProps}
					/>
				);
			}
		};
	};
}
