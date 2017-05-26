// @flow
import React, { Component } from "react";

type FunctionComponent<P> = (props: P) => ?React$Element<any>;
type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;

type FormState = {
	isValid: boolean,
	isLoading: boolean,
	serverError?: string,
};
type FormFieldState = {
	value: any,
	isDirty: boolean,
	error?: string,
};
type FormConfig = {
	initFields: (props: Props) => { [string]: string },
	validate: (data: { [string]: any }) => { [string]: string },
	submit: (data: { [string]: any }) => Promise<any>,
	onSuccess?: (results: any) => void,
	onError?: (reason: any) => void
};

type DefaultProps = any;
type Props = any;

type State = {
	formState: FormState,
	formFields: { [string]: FormFieldState },
	formResult: any,
};

const formatFormData = (state: { [string]: FormFieldState }): { [string]: any } => {
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = state[key].value;
		return acc;
	}, {});
};

const updateFieldsState = (
	state: { [string]: any },
	errors: { [string]: any }
): { [string]: FormFieldState } => {
	return Object.keys(state).reduce((acc, key) => {
		acc[key] = {
			...state[key],
			isDirty: false,
			error: errors[key],
		};
		return acc;
	}, {});
};

function hasError(errorObj): boolean {
	return Object.keys(errorObj).length > 0;
}

export default function formCreate({
	initFields,
	validate,
	submit,
	onSuccess = () => {},
	onError = () => {}
}: FormConfig) {
	return function decorator<P, S>(
		WrappedComponent: ClassComponent<void, P, S> | FunctionComponent<P>
	): ClassComponent<DefaultProps, Props, State> {
		return class PragForm extends Component<DefaultProps, Props, State> {
			state = {
				formFields: {},
				formState: {
					isValid: false,
					isLoading: false,
					serverError: undefined
				},
				formResult: undefined
			};

			constructor(props: any, context: any) {
				super(props, context);

				const initialData = initFields(props);
				const initialErrors = validate(initialData);
				this.state = {
					formFields: updateFieldsState(initialData, initialErrors),
					formState: {
						isValid: !hasError(initialErrors),
						isLoading: false,
						serverError: undefined
					},
					formResult: undefined
				};
			}

			_update(name: string, value: any): void {
				const { formFields } = this.state;
				this.setState({
					formFields: {
						...formFields,
						[name]: {
							hasError: false,
							isDirty: true,
							value
						}
					}
				});
			}

			updateField = (name: string) => (event: Event | any) => {
				const value = (event.target && event.target.value) || event;
				this._update(name, value);
			};

			updateCheck = (name: string) => (event: Event | any) => {
				const value = (event.target && event.target.checked) || event;
				this._update(name, value);
			};

			handleSubmit = (event?: Event) => {
				event && event.preventDefault && event.preventDefault();

				const formData = formatFormData(this.state.formFields);
				const errors = validate(formData);
				const formFields = updateFieldsState(this.state.formFields, errors);

				if (hasError(errors)) {
					return this.setState({
						formState: {
							...this.state.formState,
							isValid: false
						}
					});
				} else {
					this.setState({
						formState: {
							...this.state.formState,
							isValid: true,
							loading: true
						},
						formFields
					});

					return submit(formData, this.props)
						.then(results => {
							this.setState({
								formState: {
									...this.state.formState,
									isLoading: false,
									isSuccess: true
								},
								formResult: results
							});
							return onSuccess(results, this.props);
						})
						.catch(reason => {
							this.setState({
								formState: {
									...this.state.formState,
									isLoading: false,
									serverError: reason
								}
							});
							return onError(reason);
						});
				}
			};

			render() {
				return (
					<WrappedComponent
						{...this.props}
						formState={this.state.formState}
						formFields={this.state.formFields}
						formActions={{
							onSubmit: this.handleSubmit,
							updateField: this.updateField,
							updateCheck: this.updateCheck
						}}
					/>
				);
			}
		};
	};
}
