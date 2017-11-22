'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.configureForm = configureForm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialFieldState = function initialFieldState(value) {
	return {
		value: value,
		isDirty: false,
		error: undefined
	};
};


var initialiseFormFields = function initialiseFormFields(initialData) {
	return (0, _keys2.default)(initialData).reduce(function (acc, key) {
		acc[key] = initialFieldState(initialData[key]);
		return acc;
	}, {});
};

var updateFormFieldErrors = function updateFormFieldErrors(state, errors) {
	return (0, _keys2.default)(state).reduce(function (acc, key) {
		acc[key] = (0, _extends4.default)({}, state[key], {
			error: errors[key]
		});
		return acc;
	}, {});
};

function objectHasKeys(errorObj) {
	return (0, _keys2.default)(errorObj).length > 0;
}

var getFormFieldsValues = function getFormFieldsValues(state) {
	return (0, _keys2.default)(state).reduce(function (acc, key) {
		acc[key] = state[key].value;
		return acc;
	}, {});
};

var getFormFieldsErrors = function getFormFieldsErrors(state) {
	return (0, _keys2.default)(state).reduce(function (acc, key) {
		if (state[key].error) {
			acc[key] = state[key].error;
		}
		return acc;
	}, {});
};

function configureForm(_ref) {
	var initFields = _ref.initFields,
	    submit = _ref.submit,
	    _ref$validate = _ref.validate,
	    validate = _ref$validate === undefined ? function () {
		return {};
	} : _ref$validate,
	    _ref$onSuccess = _ref.onSuccess,
	    onSuccess = _ref$onSuccess === undefined ? function () {} : _ref$onSuccess,
	    _ref$onError = _ref.onError,
	    onError = _ref$onError === undefined ? function () {} : _ref$onError;


	var options = {
		initFields: initFields,
		submit: submit,
		validate: validate,
		onSuccess: onSuccess,
		onError: onError
	};

	return function decorator(WrappedComponent) {
		var _class, _temp, _initialiseProps;

		return _temp = _class = function (_Component) {
			(0, _inherits3.default)(PragForm, _Component);

			function PragForm(props, context) {
				(0, _classCallCheck3.default)(this, PragForm);

				var _this = (0, _possibleConstructorReturn3.default)(this, (PragForm.__proto__ || (0, _getPrototypeOf2.default)(PragForm)).call(this, props, context));

				_initialiseProps.call(_this);

				var initialData = options.initFields(props);
				_this.state = {
					formFields: initialiseFormFields(initialData),
					submitResult: undefined,
					submitError: undefined,
					isLoading: false,
					isPristine: true
				};
				return _this;
			}

			(0, _createClass3.default)(PragForm, [{
				key: 'setState',
				value: function setState(changes, callback) {
					var _this2 = this;

					(0, _get3.default)(PragForm.prototype.__proto__ || (0, _getPrototypeOf2.default)(PragForm.prototype), 'setState', this).call(this, changes, function () {
						_this2.props.onFormStateChange(_this2.state);
						callback && callback();
					});
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(WrappedComponent, (0, _extends4.default)({}, this.props, {
						form: this.formProps()
					}));
				}
			}]);
			return PragForm;
		}(_react.Component), _class.defaultProps = {
			onFormStateChange: function onFormStateChange() {}
		}, _initialiseProps = function _initialiseProps() {
			var _this3 = this;

			this.state = {
				formFields: {},
				isPristine: true,
				isLoading: false,
				submitResult: undefined,
				submitError: undefined
			};
			this.fieldProps = {};

			this.componentDidMount = function () {
				_this3.props.onFormStateChange(_this3.state);
			};

			this._reportChanges = function () {
				_this3.props.onFormStateChange(_this3.state);
			};

			this.updateField = function (name, value) {
				var formFields = _this3.state.formFields;

				_this3.setState({
					formFields: (0, _extends4.default)({}, formFields, (0, _defineProperty3.default)({}, name, {
						value: value,
						error: undefined,
						isDirty: true
					})),
					isPristine: false,
					submitError: undefined
				});
			};

			this._createInputOnChange = function (name) {
				return function (event) {
					_this3.updateField(name, event.currentTarget.value);
				};
			};

			this._createCheckOnChange = function (name) {
				return function (event) {
					_this3.updateField(name, event.currentTarget.checked);
				};
			};

			this._getFieldValueWithDefault = function (name, defaultValue) {
				if (_this3.state.formFields[name]) {
					return _this3.state.formFields[name].value;
				} else {
					return defaultValue;
				}
			};

			this.formInputProps = function (options) {
				var name = options.name,
				    type = options.type,
				    value = options.value,
				    checked = options.checked;

				if (!_this3.fieldProps[name]) {
					_this3.fieldProps[name] = {
						name: name,
						type: type,
						onChange: type === 'checkbox' ? _this3._createCheckOnChange(name) : _this3._createInputOnChange(name)
					};
				}

				var disabled = _this3.state.isLoading;

				switch (type) {
					case 'checkbox':
						return (0, _assign2.default)(_this3.fieldProps[name], {
							checked: _this3._getFieldValueWithDefault(name, checked), // This defaults to not checked
							disabled: disabled
						});
					case 'radio':
						return (0, _assign2.default)(_this3.fieldProps[name], {
							checked: _this3._getFieldValueWithDefault(name, value) === value,
							value: value,
							disabled: disabled
						});
					default:
						return (0, _assign2.default)(_this3.fieldProps[name], {
							value: _this3._getFieldValueWithDefault(name, value),
							disabled: disabled
						});
				}
			};

			this.formFieldProps = function (options) {
				var inputProps = _this3.formInputProps(options);
				var fieldState = _this3.state.formFields[options.name];

				return (0, _assign2.default)(inputProps, {
					error: fieldState.error,
					isDirty: fieldState.isDirty,
					onValueChange: function onValueChange(value) {
						return _this3.updateField(options.name, value);
					}
				});
			};

			this.submit = function () {
				return _this3.handleSubmit();
			};

			this.reset = function () {
				return _this3.handleReset();
			};

			this.handleSubmit = function () {
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
					var formData, errors, _result;

					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									event && event.preventDefault();
									formData = getFormFieldsValues(_this3.state.formFields);
									errors = options.validate(formData, _this3.props, _this3.formProps());

									if (!objectHasKeys(errors)) {
										_context.next = 5;
										break;
									}

									return _context.abrupt('return', _this3.setState({
										formFields: updateFormFieldErrors(_this3.state.formFields, errors)
									}));

								case 5:

									_this3.setState({
										isLoading: true
									});

									_context.prev = 6;
									_context.next = 9;
									return options.submit(formData, _this3.props, _this3.formProps());

								case 9:
									_result = _context.sent;

									_this3.setState({
										isLoading: false,
										submitResult: _result
									}, function () {
										options.onSuccess(_result, _this3.props, _this3.formProps());
									});
									_context.next = 16;
									break;

								case 13:
									_context.prev = 13;
									_context.t0 = _context['catch'](6);

									_this3.setState({
										isLoading: false,
										submitError: _context.t0
									}, function () {
										options.onError(_context.t0, _this3.props, _this3.formProps());
									});

								case 16:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this3, [[6, 13]]);
				}));

				return function (_x) {
					return _ref2.apply(this, arguments);
				};
			}();

			this.handleReset = function () {
				var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event) {
					var initialData;
					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									event && event.preventDefault();
									initialData = options.initFields(_this3.props);

									_this3.setState({
										formFields: initialiseFormFields(initialData),
										submitResult: undefined,
										submitError: undefined,
										isLoading: false,
										isPristine: true
									});

								case 3:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, _this3);
				}));

				return function (_x2) {
					return _ref3.apply(this, arguments);
				};
			}();

			this.formProps = function () {
				var errors = getFormFieldsErrors(_this3.state.formFields);
				var hasErrors = objectHasKeys(errors);

				return {
					isLoading: _this3.state.isLoading,
					isPristine: _this3.state.isPristine,
					submitError: _this3.state.submitError,
					submitResult: _this3.state.submitResult,
					errors: errors,
					hasErrors: hasErrors,

					fields: _this3.state.formFields,

					submit: _this3.submit,
					reset: _this3.reset,
					updateField: _this3.updateField,

					// Event Handlers
					onSubmit: _this3.handleSubmit,
					onReset: _this3.handleReset,

					getInputProps: _this3.formInputProps,
					getFieldProps: _this3.formFieldProps,

					// Old API - Depricated
					state: {
						isLoading: _this3.state.isLoading,
						isPristine: _this3.state.isPristine,
						hasErrors: hasErrors,
						errors: errors,
						submitError: _this3.state.submitError,
						submitResult: _this3.state.submitResult
					},
					actions: {
						submit: _this3.submit,
						onSubmit: _this3.handleSubmit,
						reset: _this3.reset,
						onReset: _this3.handleReset,
						onInputChange: _this3._createInputOnChange,
						onCheckChange: _this3._createCheckOnChange
					}
				};
			};
		}, _temp;
	};
}
