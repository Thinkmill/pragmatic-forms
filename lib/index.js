"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = formCreate;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formatFormData = function formatFormData(state) {
	return Object.keys(state).reduce(function (acc, key) {
		acc[key] = state[key].value;
		return acc;
	}, {});
};

var updateFieldsState = function updateFieldsState(state, errors) {
	return Object.keys(state).reduce(function (acc, key) {
		acc[key] = _extends({}, state[key], {
			isDirty: false,
			error: errors[key]
		});
		return acc;
	}, {});
};

function hasError(errorObj) {
	return Object.keys(errorObj).length > 0;
}

function formCreate(_ref) {
	var initFields = _ref.initFields,
	    validate = _ref.validate,
	    submit = _ref.submit,
	    _ref$onSuccess = _ref.onSuccess,
	    onSuccess = _ref$onSuccess === undefined ? function () {} : _ref$onSuccess,
	    _ref$onError = _ref.onError,
	    onError = _ref$onError === undefined ? function () {} : _ref$onError;

	return function decorator(WrappedComponent) {
		return function (_Component) {
			_inherits(PragForm, _Component);

			function PragForm(props, context) {
				_classCallCheck(this, PragForm);

				var _this = _possibleConstructorReturn(this, (PragForm.__proto__ || Object.getPrototypeOf(PragForm)).call(this, props, context));

				_this.state = {
					formFields: {},
					formState: {
						isValid: false,
						isLoading: false,
						serverError: undefined
					},
					formResult: undefined
				};

				_this.updateField = function (name) {
					return function (event) {
						var value = event.target && event.target.value || event;
						_this._update(name, value);
					};
				};

				_this.updateCheck = function (name) {
					return function (event) {
						var value = event.target && event.target.checked || event;
						_this._update(name, value);
					};
				};

				_this.handleSubmit = function (event) {
					event && event.preventDefault && event.preventDefault();

					var formData = formatFormData(_this.state.formFields);
					var errors = validate(formData);
					var formFields = updateFieldsState(_this.state.formFields, errors);

					if (hasError(errors)) {
						return _this.setState({
							formState: _extends({}, _this.state.formState, {
								isValid: false
							})
						});
					} else {
						_this.setState({
							formState: _extends({}, _this.state.formState, {
								isValid: true,
								loading: true
							}),
							formFields: formFields
						});

						return submit(formData, _this.props).then(function (results) {
							_this.setState({
								formState: _extends({}, _this.state.formState, {
									isLoading: false,
									isSuccess: true
								}),
								formResult: results
							});
							return onSuccess(results, _this.props);
						}).catch(function (reason) {
							_this.setState({
								formState: _extends({}, _this.state.formState, {
									isLoading: false,
									serverError: reason
								})
							});
							return onError(reason);
						});
					}
				};

				var initialData = initFields(props);
				var initialErrors = validate(initialData);
				_this.state = {
					formFields: updateFieldsState(initialData, initialErrors),
					formState: {
						isValid: !hasError(initialErrors),
						isLoading: false,
						serverError: undefined
					},
					formResult: undefined
				};
				return _this;
			}

			_createClass(PragForm, [{
				key: "_update",
				value: function _update(name, value) {
					var formFields = this.state.formFields;

					this.setState({
						formFields: _extends({}, formFields, _defineProperty({}, name, {
							hasError: false,
							isDirty: true,
							value: value
						}))
					});
				}
			}, {
				key: "render",
				value: function render() {
					return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
						formState: this.state.formState,
						formFields: this.state.formFields,
						formActions: {
							onSubmit: this.handleSubmit,
							updateField: this.updateField,
							updateCheck: this.updateCheck
						}
					}));
				}
			}]);

			return PragForm;
		}(_react.Component);
	};
}