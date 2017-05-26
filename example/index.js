'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyFormComponent = function MyFormComponent(_ref) {
	var formActions = _ref.formActions,
	    formFields = _ref.formFields,
	    formState = _ref.formState;
	return _react2.default.createElement(
		'form',
		{ onSubmit: formActions.onSubmit },
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'label',
				{ htmlFor: 'name' },
				'Pirate Name'
			),
			_react2.default.createElement('input', {
				type: 'text',
				name: 'name',
				value: formFields.name.value,
				onChange: formActions.updateField('name')
			})
		),
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'label',
				{ htmlFor: 'isPirate' },
				'Are you a pirate?'
			),
			_react2.default.createElement(
				'label',
				null,
				_react2.default.createElement('input', {
					type: 'radio',
					name: 'isPirate',
					value: 'yes',
					onChange: formActions.updateField('isPirate'),
					checked: formFields.isPirate.value === 'yes'
				}),
				'Yes'
			),
			_react2.default.createElement(
				'label',
				null,
				_react2.default.createElement('input', {
					type: 'radio',
					name: 'isPirate',
					value: 'no',
					onChange: formActions.updateField('isPirate'),
					checked: formFields.isPirate.value === 'no'
				}),
				'No'
			),
			_react2.default.createElement(
				'label',
				null,
				_react2.default.createElement('input', {
					type: 'radio',
					name: 'isPirate',
					value: 'maybe',
					onChange: formActions.updateField('isPirate'),
					checked: formFields.isPirate.value === 'maybe'
				}),
				'Maybe'
			)
		),
		_react2.default.createElement(
			'div',
			null,
			Object.keys(formFields).forEach(function (fieldName) {
				return _react2.default.createElement(
					'code',
					{ key: fieldName },
					JSON.stringify(formFields[fieldName])
				);
			})
		),
		_react2.default.createElement(
			'button',
			{ type: 'submit', disabled: formState.isLoading || formState.isValid },
			'Away with ye!'
		)
	);
};

MyFormComponent.propTypes = {
	formActions: _propTypes2.default.object,
	formFields: _propTypes2.default.object,
	formState: _propTypes2.default.object
};

function validate(data) {
	var errors = {};
	if (!data.name) {
		errors.name = 'All pirates require a name';
	}

	if (!data.isPirate) {
		errors.isPirate = 'We must know if ye be a pirate';
	} else if (data.isPirate === 'no') {
		errors.isPirate = 'You should become a pirate';
	} else if (data.isPirate === 'maybe') {
		errors.isPirate = 'Either you is or you is not a pirate';
	}
	return errors;
}

var Form = (0, _index2.default)({
	initFields: function initFields() {
		return { name: '', isPirate: '' };
	},
	validate: validate,
	submit: function submit(data) {
		return new Promise(function (resolve) {
			console.log('Sending data', data); // eslint-disable-line no-console
			setTimeout(function () {
				resolve({ success: true });
			}, 1000);
		});
	}
})(MyFormComponent);

_reactDom2.default.render(_react2.default.createElement(Form, null), document.getElementById('App'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGFtcGxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIk15Rm9ybUNvbXBvbmVudCIsImZvcm1BY3Rpb25zIiwiZm9ybUZpZWxkcyIsImZvcm1TdGF0ZSIsIm9uU3VibWl0IiwibmFtZSIsInZhbHVlIiwidXBkYXRlRmllbGQiLCJpc1BpcmF0ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZmllbGROYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzTG9hZGluZyIsImlzVmFsaWQiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJ2YWxpZGF0ZSIsImRhdGEiLCJlcnJvcnMiLCJGb3JtIiwiaW5pdEZpZWxkcyIsInN1Ym1pdCIsIlByb21pc2UiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsInJlc29sdmUiLCJzdWNjZXNzIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLEtBQUdDLFdBQUgsUUFBR0EsV0FBSDtBQUFBLEtBQWdCQyxVQUFoQixRQUFnQkEsVUFBaEI7QUFBQSxLQUE0QkMsU0FBNUIsUUFBNEJBLFNBQTVCO0FBQUEsUUFDdkI7QUFBQTtBQUFBLElBQU0sVUFBVUYsWUFBWUcsUUFBNUI7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsTUFBTyxTQUFRLE1BQWY7QUFBQTtBQUFBLElBREQ7QUFFQztBQUNDLFVBQUssTUFETjtBQUVDLFVBQUssTUFGTjtBQUdDLFdBQU9GLFdBQVdHLElBQVgsQ0FBZ0JDLEtBSHhCO0FBSUMsY0FBVUwsWUFBWU0sV0FBWixDQUF3QixNQUF4QjtBQUpYO0FBRkQsR0FERDtBQVVDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxNQUFPLFNBQVEsVUFBZjtBQUFBO0FBQUEsSUFERDtBQUVDO0FBQUE7QUFBQTtBQUNDO0FBQ0MsV0FBSyxPQUROO0FBRUMsV0FBSyxVQUZOO0FBR0MsWUFBTSxLQUhQO0FBSUMsZUFBVU4sWUFBWU0sV0FBWixDQUF3QixVQUF4QixDQUpYO0FBS0MsY0FBU0wsV0FBV00sUUFBWCxDQUFvQkYsS0FBcEIsS0FBOEI7QUFMeEMsTUFERDtBQUFBO0FBQUEsSUFGRDtBQVlDO0FBQUE7QUFBQTtBQUNDO0FBQ0MsV0FBSyxPQUROO0FBRUMsV0FBSyxVQUZOO0FBR0MsWUFBTSxJQUhQO0FBSUMsZUFBVUwsWUFBWU0sV0FBWixDQUF3QixVQUF4QixDQUpYO0FBS0MsY0FBU0wsV0FBV00sUUFBWCxDQUFvQkYsS0FBcEIsS0FBOEI7QUFMeEMsTUFERDtBQUFBO0FBQUEsSUFaRDtBQXNCQztBQUFBO0FBQUE7QUFDQztBQUNDLFdBQUssT0FETjtBQUVDLFdBQUssVUFGTjtBQUdDLFlBQU0sT0FIUDtBQUlDLGVBQVVMLFlBQVlNLFdBQVosQ0FBd0IsVUFBeEIsQ0FKWDtBQUtDLGNBQVNMLFdBQVdNLFFBQVgsQ0FBb0JGLEtBQXBCLEtBQThCO0FBTHhDLE1BREQ7QUFBQTtBQUFBO0FBdEJELEdBVkQ7QUE0Q0M7QUFBQTtBQUFBO0FBQ0VHLFVBQU9DLElBQVAsQ0FBWVIsVUFBWixFQUF3QlMsT0FBeEIsQ0FBZ0M7QUFBQSxXQUNoQztBQUFBO0FBQUEsT0FBTSxLQUFLQyxTQUFYO0FBQXVCQyxVQUFLQyxTQUFMLENBQWVaLFdBQVdVLFNBQVgsQ0FBZjtBQUF2QixLQURnQztBQUFBLElBQWhDO0FBREYsR0E1Q0Q7QUFpREM7QUFBQTtBQUFBLEtBQVEsTUFBSyxRQUFiLEVBQXNCLFVBQVVULFVBQVVZLFNBQVYsSUFBdUJaLFVBQVVhLE9BQWpFO0FBQUE7QUFBQTtBQWpERCxFQUR1QjtBQUFBLENBQXhCOztBQXdEQWhCLGdCQUFnQmlCLFNBQWhCLEdBQTRCO0FBQzNCaEIsY0FBYSxvQkFBVWlCLE1BREk7QUFFM0JoQixhQUFZLG9CQUFVZ0IsTUFGSztBQUczQmYsWUFBVyxvQkFBVWU7QUFITSxDQUE1Qjs7QUFNQSxTQUFTQyxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUN2QixLQUFNQyxTQUFTLEVBQWY7QUFDQSxLQUFJLENBQUNELEtBQUtmLElBQVYsRUFBZ0I7QUFDZmdCLFNBQU9oQixJQUFQLEdBQWMsNEJBQWQ7QUFDQTs7QUFFRCxLQUFJLENBQUNlLEtBQUtaLFFBQVYsRUFBb0I7QUFDbkJhLFNBQU9iLFFBQVAsR0FBa0IsZ0NBQWxCO0FBQ0EsRUFGRCxNQUVPLElBQUlZLEtBQUtaLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7QUFDbENhLFNBQU9iLFFBQVAsR0FBa0IsNEJBQWxCO0FBQ0EsRUFGTSxNQUVBLElBQUlZLEtBQUtaLFFBQUwsS0FBa0IsT0FBdEIsRUFBK0I7QUFDckNhLFNBQU9iLFFBQVAsR0FBa0Isc0NBQWxCO0FBQ0E7QUFDRCxRQUFPYSxNQUFQO0FBQ0E7O0FBRUQsSUFBTUMsT0FBTyxxQkFBVztBQUN2QkMsYUFBWTtBQUFBLFNBQU8sRUFBRWxCLE1BQU0sRUFBUixFQUFZRyxVQUFVLEVBQXRCLEVBQVA7QUFBQSxFQURXO0FBRXZCVyxtQkFGdUI7QUFHdkJLLFNBQVEsc0JBQVE7QUFDZixTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM3QkMsV0FBUUMsR0FBUixDQUFZLGNBQVosRUFBNEJQLElBQTVCLEVBRDZCLENBQ007QUFDbkNRLGNBQVcsWUFBTTtBQUNoQkMsWUFBUSxFQUFFQyxTQUFTLElBQVgsRUFBUjtBQUNBLElBRkQsRUFFRyxJQUZIO0FBR0EsR0FMTSxDQUFQO0FBTUE7QUFWc0IsQ0FBWCxFQVdWOUIsZUFYVSxDQUFiOztBQWFBLG1CQUFTK0IsTUFBVCxDQUFnQiw4QkFBQyxJQUFELE9BQWhCLEVBQTBCQyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQTFCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgZm9ybUNyZWF0ZSBmcm9tICcuLi9pbmRleCc7XG5cbmNvbnN0IE15Rm9ybUNvbXBvbmVudCA9ICh7IGZvcm1BY3Rpb25zLCBmb3JtRmllbGRzLCBmb3JtU3RhdGUgfSkgPT4gKFxuXHQ8Zm9ybSBvblN1Ym1pdD17Zm9ybUFjdGlvbnMub25TdWJtaXR9PlxuXHRcdDxkaXY+XG5cdFx0XHQ8bGFiZWwgaHRtbEZvcj1cIm5hbWVcIj5QaXJhdGUgTmFtZTwvbGFiZWw+XG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRuYW1lPVwibmFtZVwiXG5cdFx0XHRcdHZhbHVlPXtmb3JtRmllbGRzLm5hbWUudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXtmb3JtQWN0aW9ucy51cGRhdGVGaWVsZCgnbmFtZScpfVxuXHRcdFx0Lz5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2PlxuXHRcdFx0PGxhYmVsIGh0bWxGb3I9XCJpc1BpcmF0ZVwiPkFyZSB5b3UgYSBwaXJhdGU/PC9sYWJlbD5cblx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0dHlwZT1cInJhZGlvXCJcblx0XHRcdFx0XHRuYW1lPVwiaXNQaXJhdGVcIlxuXHRcdFx0XHRcdHZhbHVlPVwieWVzXCJcblx0XHRcdFx0XHRvbkNoYW5nZT17Zm9ybUFjdGlvbnMudXBkYXRlRmllbGQoJ2lzUGlyYXRlJyl9XG5cdFx0XHRcdFx0Y2hlY2tlZD17Zm9ybUZpZWxkcy5pc1BpcmF0ZS52YWx1ZSA9PT0gJ3llcyd9XG5cdFx0XHRcdC8+XG5cdFx0XHRcdFllc1xuXHRcdFx0PC9sYWJlbD5cblx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0dHlwZT1cInJhZGlvXCJcblx0XHRcdFx0XHRuYW1lPVwiaXNQaXJhdGVcIlxuXHRcdFx0XHRcdHZhbHVlPVwibm9cIlxuXHRcdFx0XHRcdG9uQ2hhbmdlPXtmb3JtQWN0aW9ucy51cGRhdGVGaWVsZCgnaXNQaXJhdGUnKX1cblx0XHRcdFx0XHRjaGVja2VkPXtmb3JtRmllbGRzLmlzUGlyYXRlLnZhbHVlID09PSAnbm8nfVxuXHRcdFx0XHQvPlxuXHRcdFx0XHROb1xuXHRcdFx0PC9sYWJlbD5cblx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0dHlwZT1cInJhZGlvXCJcblx0XHRcdFx0XHRuYW1lPVwiaXNQaXJhdGVcIlxuXHRcdFx0XHRcdHZhbHVlPVwibWF5YmVcIlxuXHRcdFx0XHRcdG9uQ2hhbmdlPXtmb3JtQWN0aW9ucy51cGRhdGVGaWVsZCgnaXNQaXJhdGUnKX1cblx0XHRcdFx0XHRjaGVja2VkPXtmb3JtRmllbGRzLmlzUGlyYXRlLnZhbHVlID09PSAnbWF5YmUnfVxuXHRcdFx0XHQvPlxuXHRcdFx0XHRNYXliZVxuXHRcdFx0PC9sYWJlbD5cblx0XHQ8L2Rpdj5cblxuXHRcdDxkaXY+XG5cdFx0XHR7T2JqZWN0LmtleXMoZm9ybUZpZWxkcykuZm9yRWFjaChmaWVsZE5hbWUgPT4gKFxuXHRcdFx0XHQ8Y29kZSBrZXk9e2ZpZWxkTmFtZX0+e0pTT04uc3RyaW5naWZ5KGZvcm1GaWVsZHNbZmllbGROYW1lXSl9PC9jb2RlPlxuXHRcdFx0KSl9XG5cdFx0PC9kaXY+XG5cdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2Zvcm1TdGF0ZS5pc0xvYWRpbmcgfHwgZm9ybVN0YXRlLmlzVmFsaWR9PlxuXHRcdFx0QXdheSB3aXRoIHllIVxuXHRcdDwvYnV0dG9uPlxuXHQ8L2Zvcm0+XG4pO1xuXG5NeUZvcm1Db21wb25lbnQucHJvcFR5cGVzID0ge1xuXHRmb3JtQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcblx0Zm9ybUZpZWxkczogUHJvcFR5cGVzLm9iamVjdCxcblx0Zm9ybVN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZnVuY3Rpb24gdmFsaWRhdGUoZGF0YSkge1xuXHRjb25zdCBlcnJvcnMgPSB7fTtcblx0aWYgKCFkYXRhLm5hbWUpIHtcblx0XHRlcnJvcnMubmFtZSA9ICdBbGwgcGlyYXRlcyByZXF1aXJlIGEgbmFtZSc7XG5cdH1cblxuXHRpZiAoIWRhdGEuaXNQaXJhdGUpIHtcblx0XHRlcnJvcnMuaXNQaXJhdGUgPSAnV2UgbXVzdCBrbm93IGlmIHllIGJlIGEgcGlyYXRlJztcblx0fSBlbHNlIGlmIChkYXRhLmlzUGlyYXRlID09PSAnbm8nKSB7XG5cdFx0ZXJyb3JzLmlzUGlyYXRlID0gJ1lvdSBzaG91bGQgYmVjb21lIGEgcGlyYXRlJztcblx0fSBlbHNlIGlmIChkYXRhLmlzUGlyYXRlID09PSAnbWF5YmUnKSB7XG5cdFx0ZXJyb3JzLmlzUGlyYXRlID0gJ0VpdGhlciB5b3UgaXMgb3IgeW91IGlzIG5vdCBhIHBpcmF0ZSc7XG5cdH1cblx0cmV0dXJuIGVycm9ycztcbn1cblxuY29uc3QgRm9ybSA9IGZvcm1DcmVhdGUoe1xuXHRpbml0RmllbGRzOiAoKSA9PiAoeyBuYW1lOiAnJywgaXNQaXJhdGU6ICcnIH0pLFxuXHR2YWxpZGF0ZSxcblx0c3VibWl0OiBkYXRhID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhJywgZGF0YSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHJlc29sdmUoeyBzdWNjZXNzOiB0cnVlIH0pO1xuXHRcdFx0fSwgMTAwMCk7XG5cdFx0fSk7XG5cdH0sXG59KShNeUZvcm1Db21wb25lbnQpO1xuXG5SZWFjdERPTS5yZW5kZXIoPEZvcm0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBcHAnKSk7XG4iXX0=