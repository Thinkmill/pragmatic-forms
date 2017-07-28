// @flow
import React, { Component } from 'react';

type FieldPropOptions = {
	name: string,
	type?: string,
	value?: any,
	// parse?: ,
	// format?: func,
};

type FieldItemState<T> = {
	value: T,
	isDirty: Boolean,
	error: ?String,
};

const initialiseFormFields = <A>(initialData: { [string]: A }): { [string]: FieldItemState<A> } => {
	return Object.keys(initialData).reduce((acc, key) => {
		acc[key] = {
			value: initialData[key],
			isDirty: false,
			error: undefined,
		};
		return acc;
	}, {});
}

const updateFormFieldErrors = <A>(state: { [string]: FieldItemState<A> }, errors: { [string]: String }): { [string]: FieldItemState<A> } => {
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = {
			...state[key],
			error: errors[key],
		};
		return acc;
	}, {});
};

function hasErrors(errorObj: { [string]: string }): boolean {
	return Object.keys(errorObj).length > 0;
}

const getFormFieldsValues = <A>(state: { [string]: FieldItemState<A> }): { [string]: A } => { 
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = state[key].value;
		return acc;
	}, {});
};

const getFormFieldsErrors = <A>(state: { [string]: FieldItemState<A> }): { [string]: string } => {
	return Object.keys(state).reduce((acc, key) => {
		if (state[key].error) {
			acc[key] = state[key].error;
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

			props: {
				onFormStateChange: Function,
			}

			state = {
				formFields: {},
				isLoading: false,
				submitResult: undefined,
				submitError: undefined,
			}
			
			defaultProps = {
				onFormStateChange: () => {},
			}
			
			fieldProps = {}

			constructor(props: any, context: any) {
				super(props, context);
				const initialData = initFields(props);
				this.state = {
					formFields: initialiseFormFields(initialData),
					submitResult: undefined,
					submitError: undefined,
					isLoading: false,
				};
			}
			
			componentDidMount = () => {
				this.props.onFormStateChange(this.state);
			}
			
			setState (changes: { [string]: any }) {
				super.setState(changes, () => {
					this.props.onFormStateChange(this.state);
				});
			}
			
			_reportChanges = () => {
				this.props.onFormStateChange(this.state)
			}

			_updateField = (name: string, value: any) => {
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
				this._updateField(name, event.currentTarget.value);
			};

			updateCheck = (name: string) => (event: any) => {
				this._updateField(name, event.currentTarget.checked);
			};

			formInputProps = (options: FieldPropOptions)  => {
				const { name, type, value } = options;
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

			formFieldProps = (options: FieldPropOptions) => {
				const inputProps = this.formInputProps(options);
				const fieldState = this.state.formFields[options.name];

				return Object.assign(inputProps, {
					error: fieldState.error,
					isDirty: fieldState.isDirty,
					onValueChange: (value) => this._updateField(options.name, value),
				});
			}

			handleSubmit = async (event: Event) => {
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
