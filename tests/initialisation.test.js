import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { configureForm } from '../src/index';

describe('initialisation', () => {
	it('creates a formFields object', () => {
		const withForm = configureForm({
			initFields: () => ({ name: 'mike' }),
		});
		const WrappedComponent = withForm('div');
		const initialisedComponent = new WrappedComponent();

		expect(initialisedComponent.state.formFields).toEqual({
			name: {
				value: 'mike',
				error: undefined,
				isDirty: false,
				valueType: 'string',
			},
		});
	});
});

describe('initFields user method', () => {
	it('is called at initialisation', () => {
		const initFields = jest.fn(() => ({ name: '' }));
		const withForm = configureForm({ initFields });
		const Comp = withForm('div');

		// Render the component
		renderer.create(<Comp />);
		expect(initFields.mock.calls.length).toBe(1);
	});
	it('is called with the props passed to the component', () => {
		const initFields = jest.fn(() => ({ name: '' }));
		const withForm = configureForm({ initFields });
		const Comp = withForm('div');

		// Render the component
		renderer.create(<Comp cheese="Camembert" />);
		expect(initFields.mock.calls[0][0]).toEqual({
			cheese: 'Camembert',
		});
	});
	it('is called on form reset', () => {
		const initFields = jest.fn(() => ({ name: '' }));
		const withForm = configureForm({ initFields });
		const Comp = withForm(({ form }) => <form.Form />);

		// Render the component
		shallow(<Comp />);
		expect(initFields.mock.calls.length).toBe(1);
	});
});
