import React, { Component } from 'react';

export default class Instruction extends Component {
	render() {
		return (
			<div className="instruction_container">
				<button onClick={this.props.generateMessage(1)}> Generate message </button>
			
			</div>
		);
	}
}