import React, { Component } from "react";
import { Link } from "react-router-dom";
import md5 from "md5"

import "./RegisterLogin.css";

var localApiUrl = "http://localhost:4000";
var detachedApiUrl = "http://greatcontactmanager.ddns.net:4000";

class Login extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      errors: {},
	  errorMessageVisability: false
    };
	
		this.login = this.login.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

	login(e) {
		e.preventDefault();
		
		let reqBody = 
		{
			user: this.state.user,
			hash: md5(this.state.password)
		};
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/users/login',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		})
		.then(response => response.json())
		  .then(data => {
			  if(data.status === 'failure')
			  { 
				this.setState({ errorMessageVisability: true });
				  
				console.log('invalid login credentials');
			  }
			  else if(data.status === 'success')
			  {
				console.log(data.id);
				console.log('continuing login');
				window.location.href = "/ContactList?" + data.id;
			  }
		  });
	}
	
  render() {
    const { errors } = this.state;
	return (
      <div className="container">

		<header className="header">
            <h2 className="title">Contact Manager</h2>
            <p>Login</p> 
        </header>

		<form id="login-form" action="" method="post" noValidate onSubmit={this.onSubmit}>

          <input type="text" placeholder="Username" 
			onChange={this.onChange}
			value={this.state.user}
			error={errors.user}
			id="user"
			required/>
          <input type="password" placeholder="Password" 
			onChange={this.onChange}
			value={this.state.password}
			error={errors.password}
			id="password"
			required/>

          <footer>
            <button type="submit" onClick={this.login}>Login</button>
			<Link to="./Register" id="switch">
				<label htmlFor="switch"><span>Need an account? Register</span></label>
			</Link>
          </footer>
			<div id="failed">
				{ this.state.errorMessageVisability ? <p>Invalid username or password.</p> : null } 
			  </div>
        </form>
      </div>
    );
  }
}
export default Login;