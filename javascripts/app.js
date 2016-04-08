import React from 'react';
import ReactDOM from 'react-dom';

import '../stylesheets/main.scss';

import Colophon from '../markdown/colophon.md';

import Canvas from './components/CopiaCanvas.jsx';
import Timer from './components/Timer.jsx';
import NewButton from './components/NewButton.jsx';

ReactDOM.render(
	<div>
		<h1>Quintilian, Forever:</h1>
		<Canvas initial={1}/>
		<Timer delay={2.7}/>
	</div>,
	document.getElementById('react-mount') //Replace the timer line with: <NewButton per_click={1}/>
);

document.getElementById('Colophon').innerHTML=Colophon;