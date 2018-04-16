import React from 'react';
// import renderer from 'react-test-renderer';
import { mount	 } from 'enzyme';
import { configureForm } from '../src/index';

describe('formInputProps', () => {
	it('should provide props for a text input', () => {
		const withForm = configureForm({ initFields: () => ({ name: 'exising data' }) });
		const MockInput = jest.fn().mockReturnValue(<div />);

		const Comp = withForm(({ form }) => (
			<MockInput {...form.getInputProps({ type: 'text', name: 'name' })} />
		));

		mount(<Comp />);
		expect(MockInput).toBeCalledWith(
			{
				name: 'name',
				type: 'text',
				value: 'exising data',
				disabled: false,
				onChange: expect.any(Function),
			},
			{},
		);
	});
	it('should provide props for a checkbox input', () => {
		const withForm = configureForm({ initFields: () => ({ name: true }) });
		const MockInput = jest.fn().mockReturnValue(<div />);
		const Comp = withForm(({ form }) => (
			<MockInput {...form.getInputProps({ type: 'checkbox', name: 'name' })} />
		));

		mount(<Comp />);
		expect(MockInput).toBeCalledWith(
			{
				name: 'name',
				type: 'checkbox',
				disabled: false,
				checked: true,
				onChange: expect.any(Function),
			},
			{},
		);
	});
	it('should provide props for a radio input', () => {
		const withForm = configureForm({ initFields: () => ({ name: '' }) });
		const MockInput = jest.fn().mockReturnValue(<div />);
		const Comp = withForm(({ form }) => (
			<MockInput {...form.getInputProps({ type: 'radio', name: 'name', value: 'radio_value' })} />
		));

		mount(<Comp />);
		expect(MockInput).toBeCalledWith(
			{
				name: 'name',
				type: 'radio',
				value: 'radio_value',
				disabled: false,
				checked: false,
				onChange: expect.any(Function),
			},
			{},
		);
	});
	it('should provide props for a file input', () => {
		const withForm = configureForm({ initFields: () => ({ cv: null }) });
		const MockInput = jest.fn().mockReturnValue(<div />);
		const Comp = withForm(({ form }) => (
			<MockInput {...form.getInputProps({ type: 'file', name: 'cv', value: null })} />
		));

		mount(<Comp />);
		expect(MockInput).toBeCalledWith(
			{
				name: 'cv',
				type: 'file',
				files: [null],
				disabled: false,
				onChange: expect.any(Function),
			},
			{},
		);
	});
});
