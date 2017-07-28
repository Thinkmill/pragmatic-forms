import styled from 'styled-components';

const colors = {
	default: '#2196F3',
	danger: '#a7a7a7',
};

export const Tile = styled.div`
	padding: 10px;
	border: 0;
	box-shadow: 0 0 3px rgba(0,0,0,0.25);
	border-radius: 4px;
	margin-bottom: 10px;
	margin-top: 10px;
`;
export const FieldsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 10px;
	margin-bottom: 10px;
`;
export const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-content: center;
	grid-column-gap: 10px;
`;
export const Input = styled.input`
	min-width: 60px;
	border: 0;
	border-bottom: 2px solid ${({ error }) => error ? '#F33' : '#EEE'};
	font-size: 16px;
	font-weight: light;
	margin-left: 4px;
	margin-right: 4px;
	line-height: 2;
`;
export const Select = styled.select`
	appearance: none;
	border: 0;
	line-height: 2;
	border-bottom: 2px solid ${({ error }) => error ? '#F33' : '#EEE'};
	border-radius: 0;
	font-size: 16px;
	font-weight: light;
	background: transparent;
	margin-left: 4px;
	margin-right: 4px;
`;

export const Button = styled.button.attrs({
	mode: (props) => props.mode || 'default',
})`
	color: white;
	background-color: ${({ mode }) => colors[mode]};
	border: none;
	box-shadow: 0 2px 2px rgba(0,0,0,0.25);
	font-size: 14px;
	font-weight: lighter;
	border-radius: 4px;
	padding: 0.5em 1.5em;
	
	&:disabled {
		opacity: 0.3;
	}
`;
