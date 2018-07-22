import React, {Component} from 'react';
import _ from 'lodash';

export default class Messages extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	messages: []
    };

    this.markMessageRead = this.markMessageRead.bind(this);

	}
	componentDidMount() {
		fetch('/api/messages')
			.then(res => res.json())
			.then(messages => this.setState({messages}));
	}

	markMessageRead (id) {
		return () => {
			fetch(`/api/read/${id}`)
			.then(res => {
				let mark = false
				const messages = this.state.messages.map(message =>{
					if(message.id == id && message.new){
						message.new = false;
						mark = true;
					}
					return message;
				})

				this.setState(messages);
				if(mark) this.props.readMessage();
			})
		}
	}

	render() {
		return (
			<div>
				{this.state.messages.map((message, index) =>
          <div key={message.id} className='message_container' onClick={this.markMessageRead(message.id)}>
          	<div className="message_content">
          		<span className={'message_new '+ (message.new?'message_new-active':'')}>&nbsp;</span>
          		<span>{message.mes}</span>
          	</div>
          	<span className="message_sender">{message.sender}</span>
          </div>
        )}
			</div>
		);
	}
}