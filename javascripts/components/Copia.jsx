import React from 'react';

export default class Copia extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<h2>{this.props.copia}</h2>
		);
	}
}