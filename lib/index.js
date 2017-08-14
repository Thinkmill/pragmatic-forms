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

exports.PragForm = PragForm;

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

function hasErrors(errorObj) {
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

function PragForm(_ref) {
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

	return function decorator(WrappedComponent) {
		var _class, _temp;

		return _temp = _class = function (_Component) {
			(0, _inherits3.default)(PragForm, _Component);

			function PragForm(props, context) {
				var _this2 = this;

				(0, _classCallCheck3.default)(this, PragForm);

				var _this = (0, _possibleConstructorReturn3.default)(this, (PragForm.__proto__ || (0, _getPrototypeOf2.default)(PragForm)).call(this, props, context));

				_this.state = {
					formFields: {},
					isPristine: true,
					isLoading: false,
					submitResult: undefined,
					submitError: undefined
				};
				_this.fieldProps = {};

				_this.componentDidMount = function () {
					_this.props.onFormStateChange(_this.state);
				};

				_this._reportChanges = function () {
					_this.props.onFormStateChange(_this.state);
				};

				_this._updateField = function (name, value) {
					var formFields = _this.state.formFields;

					_this.setState({
						formFields: (0, _extends4.default)({}, formFields, (0, _defineProperty3.default)({}, name, {
							value: value,
							error: undefined,
							isDirty: true
						})),
						isPristine: false,
						submitError: undefined
					});
				};

				_this.updateInput = function (name) {
					return function (event) {
						_this._updateField(name, event.currentTarget.value);
					};
				};

				_this.updateCheck = function (name) {
					return function (event) {
						_this._updateField(name, event.currentTarget.checked);
					};
				};

				_this._getFieldValueWithDefault = function (name, defaultValue) {
					if (_this.state.formFields[name]) {
						return _this.state.formFields[name].value;
					} else {
						return defaultValue;
					}
				};

				_this.formInputProps = function (options) {
					var name = options.name,
					    type = options.type,
					    value = options.value,
					    checked = options.checked;

					if (!_this.fieldProps[name]) {
						_this.fieldProps[name] = {
							name: name,
							type: type,
							onChange: type === 'checkbox' ? _this.updateCheck(name) : _this.updateInput(name)
						};
					}

					var disabled = _this.state.isLoading;

					switch (type) {
						case 'checkbox':
							return (0, _assign2.default)(_this.fieldProps[name], {
								checked: _this._getFieldValueWithDefault(name, checked), // This defaults to not checked based on what ...
								disabled: disabled
							});
						case 'radio':
							return (0, _assign2.default)(_this.fieldProps[name], {
								checked: _this._getFieldValueWithDefault(name, value) === value,
								value: value,
								disabled: disabled
							});
						default:
							return (0, _assign2.default)(_this.fieldProps[name], {
								value: _this._getFieldValueWithDefault(name, value),
								disabled: disabled
							});
					}
				};

				_this.formFieldProps = function (options) {
					var inputProps = _this.formInputProps(options);
					var fieldState = _this.state.formFields[options.name];

					return (0, _assign2.default)(inputProps, {
						error: fieldState.error,
						isDirty: fieldState.isDirty,
						onValueChange: function onValueChange(value) {
							return _this._updateField(options.name, value);
						}
					});
				};

				_this.triggerSubmit = function () {
					return _this.handleSubmit();
				};

				_this.handleSubmit = function () {
					var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
						var formData, errors, result;
						return _regenerator2.default.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										event && event.preventDefault();
										formData = getFormFieldsValues(_this.state.formFields);
										errors = validate(formData);

										if (!hasErrors(errors)) {
											_context.next = 5;
											break;
										}

										return _context.abrupt('return', _this.setState({
											formFields: updateFormFieldErrors(_this.state.formFields, errors)
										}));

									case 5:

										_this.setState({
											isLoading: true
										});

										_context.prev = 6;
										_context.next = 9;
										return submit(formData, _this.props);

									case 9:
										result = _context.sent;

										_this.setState({
											isLoading: false,
											isPristine: true,
											submitResult: result
										});
										return _context.abrupt('return', onSuccess(result, _this.props));

									case 14:
										_context.prev = 14;
										_context.t0 = _context['catch'](6);

										_this.setState({
											isLoading: false,
											submitError: _context.t0
										});
										return _context.abrupt('return', onError(_context.t0, _this.props));

									case 18:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, _this2, [[6, 14]]);
					}));

					return function (_x) {
						return _ref2.apply(this, arguments);
					};
				}();

				var initialData = initFields(props);
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
				value: function setState(changes) {
					var _this3 = this;

					(0, _get3.default)(PragForm.prototype.__proto__ || (0, _getPrototypeOf2.default)(PragForm.prototype), 'setState', this).call(this, changes, function () {
						_this3.props.onFormStateChange(_this3.state);
					});
				}
			}, {
				key: 'render',
				value: function render() {
					var errors = getFormFieldsErrors(this.state.formFields);
					return _react2.default.createElement(WrappedComponent, (0, _extends4.default)({}, this.props, {
						form: {
							state: {
								isLoading: this.state.isLoading,
								isPristine: this.state.isPristine,
								hasErrors: hasErrors(errors),
								errors: errors,
								submitError: this.state.submitError,
								submitResult: this.state.submitResult
							},
							fields: this.state.formFields,
							actions: {
								submit: this.triggerSubmit,
								onSubmit: this.handleSubmit,
								onInputChange: this.updateInput,
								onCheckChange: this.updateCheck
							},
							getInputProps: this.formInputProps,
							getFieldProps: this.formFieldProps
						}
					}));
				}
			}]);
			return PragForm;
		}(_react.Component), _class.defaultProps = {
			onFormStateChange: function onFormStateChange() {}
		}, _temp;
	};
}
