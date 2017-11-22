// @flow
// global document
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import JsonView from 'react-json-view'

import BasicWebForm from './BasicWebForm';
import CustomComponents from './CustomComponents';
import MyVehicles from './MyVehicles';

const forms = [
	{ component: BasicWebForm, label: 'Basic Form' },
	{ component: CustomComponents, label: 'Custom Form Fields' },
	{ component: MyVehicles, label: 'Nested form' },
];

type ButtonsProps = {
	list: { label: string }[],
	selectedIndex: number,
	onSelect: (index: number) => void,
};
const Buttons = ({ list, selectedIndex, onSelect }: ButtonsProps) => (
	<div>
		{list.map((item, index) => (
			<button
				key={index}
				onClick={() => onSelect(index)}
				disabled={index === selectedIndex}
			>
				{item.label}
			</button>
		))}
	</div>
);

injectGlobal`
	body {
		font-family: 'Helvetica Neue', helvetica, Arial, sans-serif;
		font-size: 16px;
	}
	pre {
		overflow: auto;
		padding: 2vw;
		background: #efefef;
	}
`;

const Main = styled.div`
	background: #fefefe;
	padding: 4vw;
`

type State = {
	selectedForm: number,
	formState: any
};

class App extends Component<any, State> {
	state: State = {
		selectedForm: 0,
		formState: {},
	}

	select = (selectedForm) => {
		this.setState({ selectedForm });
	}

	_handleFormStateChange = (formState) => {
		this.setState({ formState });
	}

	render () {
		const CurrentForm = forms[this.state.selectedForm];
		return (
			<Main>
				<Buttons
					list={forms}
					selectedIndex={this.state.selectedForm}
					onSelect={this.select}
				/>
				<h1>{CurrentForm.label}</h1>
				<CurrentForm.component
					onFormStateChange={this._handleFormStateChange}
				/>
				<h3>Form state</h3>
				<JsonView src={this.state.formState} />
			</Main>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
