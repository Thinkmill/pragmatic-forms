// @flow
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors } from './theme';

const errorStyle = css`
	background-color: ${colors.dangerLight};
	border-bottom-color: ${colors.danger};
`;

const SInput = styled.input`
	appearance: none;
	background: transparent;
	border: 0;
	border-bottom-width: 2px;
	border-bottom-style: solid;
	border-bottom-color: ${colors.greyMid};
	color: ${colors.greyDark};
	outline: none;
	font-size: 18px;
	line-height: 1.5;
	transition: all .3s;

	&:disabled {
		background: ${colors.greyLight};
	}
	
	${props => props.error ? errorStyle : ''}
`;

export default class TextInput extends Component {

	props: {
		name: String,
		type: 'text' | 'password' | 'email',
		label: String,
		value: String,
		error?: String,
		isDirty: Boolean,
		onValueChange: (value: any) => void,
	}

	_handleChange = (event: Event & { currentTarget: HTMLInputElement }): void => {
		this.props.onValueChange(event.currentTarget.value);
	}
	
	render () {
		const { name, value, type, error } = this.props;
		const inputProps = { name, value, type, error };
		
		return (
			<div>
				<label>{this.props.label}</label>
				<SInput
					{...inputProps}
					onChange={this._handleChange}
				/>
			</div>
		);
	}
	
}
