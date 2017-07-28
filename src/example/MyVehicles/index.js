// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PragForm } from '../../index';

// import VehicleCard from './VehicleCard';
import VehicleForm from './VehicleForm';

const Container = styled.form`
	max-width: 600px;
`;

import { Button, Input } from './styled';

const withPragForm = PragForm({
	initFields: () => ({
		name: '',
		vehicles: []
	}),
	submit: (data) => console.log(data), // eslint-disable-line no-console
	validate: () => ({}),
});

class MyVehicles extends Component {

	static propTypes = {
		form: PropTypes.object,
	}

	render () {
		const { form } = this.props;
		const vehicles = form.fields.vehicles.value;
		const maxVehicles = 3;

		const items = vehicles.slice(0);
		if (items.length < maxVehicles) {
			items.push({});
		}

		return (
			<Container onSubmit={form.actions.onSubmit}>
				<Input placeholder="Your name" {...form.getInputProps({ name: 'name' })} />
				{items.map((v, index) => (
					<VehicleForm
						key={index}
						index={index}
						{...form.getFieldProps({ name: 'vehicles' })}
					/>
				))}
				{vehicles.length > 0 &&
					<div>
						<Button type="submit">Submit</Button>
					</div>
				}
			</Container>
		);
	}
}

export default withPragForm(MyVehicles);
