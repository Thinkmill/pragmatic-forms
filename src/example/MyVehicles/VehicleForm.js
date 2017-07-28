import React from 'react';
import PropTypes from 'prop-types';
import { PragForm } from '../../index';

const commonMakes = [
	{ value: '', label: 'Please choose' },
	{ value: 'Audi', label: 'Audi' },
	{ value: 'BMW', label: 'BMW' },
	{ value: 'Chevrolet', label: 'Chevrolet' },
	{ value: 'Ford', label: 'Ford' },
	{ value: 'Honda', label: 'Honda' },
	{ value: 'Hyundai', label: 'Hyundai' },
	{ value: 'Jeep', label: 'Jeep' },
	{ value: 'Kia', label: 'Kia' },
	{ value: 'Land Rover', label: 'Land Rover' },
	{ value: 'Lexus', label: 'Lexus' },
	{ value: 'Mazda', label: 'Mazda' },
	{ value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
	{ value: 'Mini', label: 'Mini' },
	{ value: 'Mitsubishi', label: 'Mitsubishi' },
	{ value: 'Nissan', label: 'Nissan' },
	{ value: 'Opel', label: 'Opel' },
	{ value: 'Porsche', label: 'Porsche' },
	{ value: 'Renault', label: 'Renault' },
	{ value: 'Suzuki', label: 'Suzuki' },
	{ value: 'Toyota', label: 'Toyota' },
	{ value: 'Volkswagen', label: 'Volkswagen' },
	{ value: 'Volvo', label: 'Volvo' },
	// { label: '──────────', disabled: true },
	// { value: OTHER_MAKE, label: 'Other' },
];

const defaultState = {
	make: '',
	model: '',
	plate: '',
};

const withPragForm = PragForm({
	initFields: (props) => {
		const { value, index } = props;
		return { ...(value[index] || defaultState) };
	},
	validate: (data) => {
		const errors = {};
		if (!data.plate) errors.plate = 'Missing plate';
		if (!data.make) errors.make = 'Missing make';
		if (!data.model) errors.model = 'Missing model';
		return errors;
	},
	submit: (data, props) => {
		const { value, index } = props;
		value.splice(index, 1, data);
		props.onValueChange(value);
		return Promise.resolve();
	}
});

import {
	Button,
	Tile,
	FieldsContainer,
	ButtonsContainer,
	Input,
	Select,
} from './styled';

const VehicleForm = ({ form, onRemove }) => {
	return (
		<Tile>
			<FieldsContainer>
				<Input placeholder="Plate" {...form.getFieldProps({ name: 'plate' })} />
				<Select {...form.getFieldProps({ name: 'make' })}>
					{commonMakes.map((make, index) => (
						<option
							key={index}
							value={make.value}
						>
							{make.label}
						</option>
					))}
				</Select>
				<Input placeholder="Model" {...form.getFieldProps({ name: 'model' })} />
			</FieldsContainer>
			<ButtonsContainer>
				<Button
					type="button"
					onClick={form.actions.submit}
					disabled={form.state.isPristine}
				>
					Create / Update
				</Button>
				<Button
					type="button"
					onClick={onRemove}
					mode="danger"
				>
					Delete
				</Button>
			</ButtonsContainer>
		</Tile>
	)
}

VehicleForm.propTypes = {
	form: PropTypes.object,
	onRemove: PropTypes.func,
};

export default withPragForm(VehicleForm);
