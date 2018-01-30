import React, { Component } from 'react';
import { configureForm } from '../src/index';

describe('displayName', () => {
	it('returns a displayName using class name', () => {
		const withForm = configureForm({ initFields: () => ({}) });
		class CheeseForm extends Component {}

		const wrappedComponent = withForm(CheeseForm);
		expect(wrappedComponent.displayName).toBe('PragmaticForm(CheeseForm)');
	});
	it('returns a displayName using displayName', () => {
		const withForm = configureForm({ initFields: () => ({}) });
		class CheeseForm extends Component {
			static displayName = 'Fromagerie';
		}

		const wrappedComponent = withForm(CheeseForm);
		expect(wrappedComponent.displayName).toBe('PragmaticForm(Fromagerie)');
	});
	it('returns a displayName using the method name', () => {
		const withForm = configureForm({ initFields: () => ({}) });
		const CheeseForm = () => <div />;

		const wrappedComponent = withForm(CheeseForm);
		expect(wrappedComponent.displayName).toBe('PragmaticForm(CheeseForm)');
	});
});
