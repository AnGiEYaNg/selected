import React, { Component } from 'react';
import Messages from './messages.jsx';
import Instruction from './instruction.jsx';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	user:{},
    	displayMessages: false
    };

    this.setDisplayMessages = this.setDisplayMessages.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
    this.readMessage = this.readMessage.bind(this);

  }

	componentDidMount() {
		fetch('/api/user')
			.then(res => res.json())
			.then(user => this.setState({user}));
	}

	setDisplayMessages(displayMessages){
		return () => {
			this.setState({displayMessages})
		}
	}

	generateMessage(count) {
		return () => {
			fetch("/api/messages", {
			  method: "POST"
			})
			.then(res => {
				const user = Object.assign({}, this.state.user);
				user.messageCount+=count;
				this.setState({user});
			})
		}
	}

	readMessage() {
		const user = Object.assign({}, this.state.user);
		if(!user.messageCount) return;
		user.messageCount--;
		this.setState({user});
	}

  render() {
    return (
    	<div className="app_container">
	    	<img className="logo" src="../logo.svg"/>
    		<div className="user">Hi {this.state.user.name}!</div>
	    	<nav className="nav">
	    		<div className={'nav_link ' + (!this.state.displayMessages?'nav_link-active':'')} onClick={this.setDisplayMessages(false)}>Instruction</div>
	    		<div className={'nav_link ' + (this.state.displayMessages?'nav_link-active':'')} onClick={this.setDisplayMessages(true)}>
	    			{this.state.user.messageCount?
		    			<div className='message_count'>{this.state.user.messageCount}</div>
		    			:
		    			''
	    			}
	    			<span>Messages</span>
	    		</div>
	    	</nav>
	    	<div className="content">
		    	{this.state.displayMessages ? 
		    		<Messages readMessage={this.readMessage}/> 
		    		: 
		    		<Instruction 
		    			generateMessage={this.generateMessage} 
		    		/>
		    	}
	    	</div>

	    </div>
	  )
  }
}

export default App;