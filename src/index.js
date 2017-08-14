// @flow
import React, { Component } from 'react';

type FieldPropOptions = {
	name: string,
	type?: string,
	value?: any,
	checked?: boolean,
	// parse?: ,
	// format?: func,
};

type FieldItemState<T> = {
	value: T,
	isDirty: Boolean,
	error: ?String,
};

const initialFieldState = (value) => ({
	value,
	isDirty: false,
	error: undefined,
});

const initialiseFormFields = <A>(initialData: { [string]: A }): { [string]: FieldItemState<A> } => {
	return Object.keys(initialData).reduce((acc, key) => {
		acc[key] = initialFieldState(initialData[key]);
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

export function PragForm ({
	initFields,
	submit,
	validate = () => ({}),
	onSuccess = () => {},
	onError = () => {},
}: {
	initFields: Function,
	submit: Function,
	validate?: Function,
	onSuccess?: Function,
	onError?: Function,
}) {
	return function decorator (WrappedComponent: any) {
		return class PragForm extends Component {

			static props: {
				onFormStateChange: Function,
			}

			static defaultProps = {
				onFormStateChange: () => {},
			}

			state = {
				formFields: {},
				isPristine: true,
				isLoading: false,
				submitResult: undefined,
				submitError: undefined,
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
					isPristine: true,
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
					isPristine: false,
					submitError: undefined,
				});
			}

			updateInput = (name: string) => (event: any) => {
				this._updateField(name, event.currentTarget.value);
			};

			updateCheck = (name: string) => (event: any) => {
				this._updateField(name, event.currentTarget.checked);
			};

			_getFieldValueWithDefault = (name: string, defaultValue: any) => {
				if (this.state.formFields[name]) {
					return this.state.formFields[name].value;
				} else {
					return defaultValue;
				}
			}

			formInputProps = (options: FieldPropOptions)  => {
				const { name, type, value, checked } = options;
				if (!this.fieldProps[name]) {
					this.fieldProps[name] = {
						name,
						type,
						onChange: (type === 'checkbox') ? this.updateCheck(name) : this.updateInput(name),
					};
				}

				const disabled = this.state.isLoading;

				switch (type) {
					case 'checkbox': 
						return Object.assign(this.fieldProps[name], {
							checked: this._getFieldValueWithDefault(name, checked), // This defaults to not checked based on what ...
							disabled,
						});
					case 'radio':
						return Object.assign(this.fieldProps[name], {
							checked: this._getFieldValueWithDefault(name, value) === value,
							value,
							disabled,
						});
					default:
						return Object.assign(this.fieldProps[name], {
							value: this._getFieldValueWithDefault(name, value),
							disabled,
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

			triggerSubmit = () => this.handleSubmit();

			handleSubmit = async (event?: Event) => {
				event && event.preventDefault();
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
						isPristine: true,
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
			}

			render() {
				const errors = getFormFieldsErrors(this.state.formFields);
				return (
					<WrappedComponent
						{...this.props}
						form={{
							state: {
								isLoading: this.state.isLoading,
								isPristine: this.state.isPristine,
								hasErrors: hasErrors(errors),
								errors,
								submitError: this.state.submitError,
								submitResult: this.state.submitResult,
							},
							fields: this.state.formFields,
							actions: {
								submit: this.triggerSubmit,
								onSubmit: this.handleSubmit,
								onInputChange: this.updateInput,
								onCheckChange: this.updateCheck,
							},
							getInputProps: this.formInputProps,
							getFieldProps: this.formFieldProps,
						}}
					/>
				);
			}
		};
	};
}
