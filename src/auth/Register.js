import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";
import md5 from "md5"
	
var localApiUrl = "http://localhost:4000";
var detachedApiUrl = "http://greatcontactmanager.ddns.net:4000";

class Register extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
	  user: "",
      password: "",
      errors: {},
	  errorMessageVisability: false
    };
	
	this.doRegister = this.doRegister.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

	const newUser = {
	  user: this.state.user,
      password: this.state.password,
    };

	console.log(newUser);
  };

	doRegister(e) {
		e.preventDefault();
		
		let reqBody = 
		{
			user: this.state.user,
			hash: md5(this.state.password)
		};
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/users/register',
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
				  console.log('username already taken');
			  }
			  else
			  {
				  console.log('registration successful');
				  window.location.href = "/Login";
			  }
		  });
	}
	
  render() {
    const { errors } = this.state;
	return (
		<div className="container">

			<header className="header">
				<h2 className="title">Contact Manager</h2>
				<p>Register</p>
			</header>

			<form id="register-form" action="" method="post" noValidate onSubmit={this.onSubmit}>

			  <input type="user" placeholder="Username" 
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
				<button type="submit" onClick={this.doRegister}>Register</button>
				<Link to="./Login" id="switch">
					<label htmlFor="switch">Already registered? Login</label>
				</Link>
			  </footer>
			  <div id="failed">
				{ this.state.errorMessageVisability ? <p>Username already taken.</p> : null } 
			  </div>
			</form>
		</div>
    );
  }
}
export default Register;
