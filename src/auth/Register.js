import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";
import md5 from "md5"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  user: "",
      password: "",
      errors: {}
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
		
		
		fetch('http://localhost:4000/users/register',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		})
		.then(response => response.json())
		  .then(data => {
			  if(data.status === 'failure')
				  console.log('username already taken');
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

			<header class="header">
				<h2 class="title">Contact Manager</h2>
				<p>Register</p>
			</header>

			<form id="register-form" action="" method="post" noValidate onSubmit={this.onSubmit}>

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
				<button type="submit" onClick={this.doRegister}>Register</button>
				<Link to="./Login" id="switch">
					<label for="switch">Already registered? Login</label>
				</Link>
			  </footer>
			</form>
		</div>
    );
  }
}
export default Register;