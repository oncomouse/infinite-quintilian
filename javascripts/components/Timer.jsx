import React from 'react';
import postal from 'postal';

export default class Timer extends React.Component {
	static propTypes = {
		delay: React.PropTypes.number // How long in seconds should we wait between copia?
	}
	
	static defaultProps = {
		delay: 2
	}
	
	constructor(props) {
		super(props);
	}
	
	state = {
		timer: undefined
	}
	
	generateNewSentence() {
		postal.publish({
			channel: 'copia',
			topic: 'add',
			data: {
				number: 1
			}
		});
	}
	
	componentWillMount() {
		this.setState({
			timer: window.setInterval(this.generateNewSentence, this.props.delay * 1000)
		});
	}
	
	componentWillUnmount() {
		this.setState({
			timer: window.clearInterval(this.state.timer)
		});
	}
	
	render() {
		return (<div/>);
	}
}