import React from 'react';
import postal from 'postal';

export default class NewButton extends React.Component {
	static propTypes = {
		per_click: React.PropTypes.number // How many copia do we add per click? Don't include to add max_copia copia to a CopiaCanvas objects
	}
	
	constructor(props) {
		super(props);
	}
	
	generateNewSentences(event) {
		postal.publish({
			channel: 'copia',
			topic: 'add',
			data: {
				number: this.props.per_click
			}
		});
	}
	
	render() {
		return (
			<button className="new-button" onClick={this.generateNewSentences.bind(this)}>Get New Copia</button>
		);
	}
}