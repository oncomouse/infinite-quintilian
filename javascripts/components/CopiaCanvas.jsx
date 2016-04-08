import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import postal from 'postal';

import InfiniteQuintilian from '../classes/InfiniteQuintilian';

import CopiaComponent from './Copia.jsx';

export default class CopiaCanvas extends React.Component {
	static propTypes = {
		max_copia: React.PropTypes.number, // How many copia in total will we display? Don't include to allow unlimited copia.
		initial: React.PropTypes.number // How many copia should we display at the start?
	}
	
	constructor(props) {
		super(props);
		
		this.copia = new InfiniteQuintilian();
		
		postal.subscribe({
			channel: 'copia',
			topic: 'add',
			callback: (data, envelope) => {
				this.addCopia(_.has(data, 'number') ? data.number : this.props.max_copia);
			}
		}) 
	}
	
	state = {
		copia: []
	}
	
	
	addCopia(number) {
		var copia = this.state.copia.slice();
		if(number === undefined) {
			number = 1;
		}
		
		if(this.props.max_copia === undefined) {
			copia = copia.concat(this.copia.get_copia(number));
		} else {			
			if(number > this.props.max_copia) {
				number = this.props.max_copia;
			}
			
			if(copia.length >= this.props.max_copia) {
				_.each(_.times(number), () => {
					copia.shift();
				});
			}
			
			_.each(this.copia.get_copia(number), (x) => {
				copia.push(x);
			});
		}
		this.setState({
			copia: copia
		});
	}
	componentWillMount() {
		if(this.props.initial !== undefined) {
			this.addCopia(this.props.initial);
		} else if(this.props.max_copia !== undefined) {
			this.addCopia(this.props.max_copia);
		} else {
			this.addCopia(1);
		}
	}
	
	componentDidUpdate() {
		document.getElementById('App').scrollTop = document.getElementById('App').scrollHeight
	}
	
	render() {
		var copia;
		
		copia = _.map(this.state.copia, (x,i) => {
			return (
				(<CopiaComponent key={x} copia={x}/>)
			);
		});
		
		return(
			<div className='copia-container'>
				<ReactCSSTransitionGroup transitionName="copia" transitionEnterTimeout={300} transitionLeave={false}>
					{copia}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}