// @flow
import React, { Component } from 'react';

type FieldPropOptions = {
	name: string,
	type?: string,
	value?: any,
	checked?: boolean,
};

type FieldItemState<T> = {
	value: T,
	isDirty: boolean,
	error: ?string,
};

type Props = {
	onFormStateChange: (formState: {[fieldName: string]: any}) => mixed
}

type FormProps = {
	[string]: any
}

type State = {
	formFields: any,
	isPristine: boolean,
	isLoading: boolean,
	submitResult?: any,
	submitError?: any,
}

type FormData = { [fieldName: string]: any }
type ErrorData = { [fieldName: string]: any }

type Options = {
	initFields: (props: any) => FormData,
	submit: (formData: FormData, props: any, formProps: FormProps) => mixed,
	validate?: (formData: FormData, props: any, formProps: FormProps) => ErrorData,
	onSuccess?: (result: any, props: any, formProps: FormProps) => mixed,
	onError?: (result: any, props: any, formProps: FormProps) => mixed,
}

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

const updateFormFieldErrors = <A>(state: { [string]: FieldItemState<A> }, errors: { [string]: string }): { [string]: FieldItemState<A> } => {
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = {
			...state[key],
			error: errors[key],
		};
		return acc;
	}, {});
};

function objectHasKeys(errorObj: { [string]: string }): boolean {
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

export function configureForm ({
	initFields,
	submit,
	validate = () => ({}),
	onSuccess = () => {},
	onError = () => {},
}: Options) {

	const options = {
		initFields,
		submit,
		validate,
		onSuccess,
		onError,
	};
	
	return function decorator (WrappedComponent: any) {
		return class PragForm extends Component<Props, State> {

			static defaultProps = {
				onFormStateChange: () => {},
			}

			state: State = {
				formFields: {},
				isPristine: true,
				isLoading: false,
				submitResult: undefined,
				submitError: undefined,
			}

			fieldProps = {}

			constructor(props: any, context: any) {
				super(props, context);
				const initialData = options.initFields(props);
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
			
			setState (changes: { [string]: any }, callback?: Function) {
				super.setState(changes, () => {
					this.props.onFormStateChange(this.state);
					callback && callback();
				});
			}
			
			_reportChanges = () => {
				this.props.onFormStateChange(this.state)
			}

			updateField = (name: string, value: any) => {
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

			_createInputOnChange = (name: string) => (event: any) => {
				this.updateField(name, event.currentTarget.value);
			};

			_createCheckOnChange = (name: string) => (event: any) => {
				this.updateField(name, event.currentTarget.checked);
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
						onChange: (type === 'checkbox') ? this._createCheckOnChange(name) : this._createInputOnChange(name),
					};
				}

				const disabled = this.state.isLoading;

				switch (type) {
					case 'checkbox': 
						return Object.assign(this.fieldProps[name], {
							checked: this._getFieldValueWithDefault(name, checked), // This defaults to not checked
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
					onValueChange: (value) => this.updateField(options.name, value),
				});
			}

			submit = () => this.handleSubmit();
			reset = () => this.handleReset();

			handleSubmit = async (event?: Event) => {
				event && event.preventDefault();
				const formData = getFormFieldsValues(this.state.formFields); 
				const errors = options.validate(formData, this.props, this.formProps());

				if (objectHasKeys(errors)) {
					return this.setState({
						formFields: updateFormFieldErrors(this.state.formFields, errors),
					});
				}

				this.setState({
					isLoading: true,
				});
				
				try {
					const result = await options.submit(formData, this.props, this.formProps());
					this.setState({
						isLoading: false,
						submitResult: result,
					}, () => {
						options.onSuccess(result, this.props, this.formProps());
					});
				} catch (reason) {
					this.setState({
						isLoading: false,
						submitError: reason,
					}, () => {
						options.onError(reason, this.props, this.formProps());
					});
				}
			}

			handleReset = async (event?: Event) => {
				event && event.preventDefault();
				const initialData = options.initFields(this.props);
				this.setState({
					formFields: initialiseFormFields(initialData),
					submitResult: undefined,
					submitError: undefined,
					isLoading: false,
					isPristine: true,
				});
			}

			formProps = (): FormProps => {
				const errors = getFormFieldsErrors(this.state.formFields);
				const hasErrors = objectHasKeys(errors);

				return {
					isLoading: this.state.isLoading,
					isPristine: this.state.isPristine,
					submitError: this.state.submitError,
					submitResult: this.state.submitResult,
					errors,
					hasErrors,

					fields: this.state.formFields,

					submit: this.submit,
					reset: this.reset,
					updateField: this.updateField,

					// Event Handlers
					onSubmit: this.handleSubmit,
					onReset: this.handleReset,

					getInputProps: this.formInputProps,
					getFieldProps: this.formFieldProps,
					
					// Old API - Depricated
					state: {
						isLoading: this.state.isLoading,
						isPristine: this.state.isPristine,
						hasErrors,
						errors,
						submitError: this.state.submitError,
						submitResult: this.state.submitResult,
					},
					actions: {
						submit: this.submit,
						onSubmit: this.handleSubmit,
						reset: this.reset,
						onReset: this.handleReset,
						onInputChange: this._createInputOnChange,
						onCheckChange: this._createCheckOnChange,
					},
				}
			} 

			render() {
				return (
					<WrappedComponent
						{...this.props}
						form={this.formProps()}
					/>
				);
			}
		};
	};
}
