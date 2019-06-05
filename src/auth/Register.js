import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
	user: "",
      	password: "",
      	errors: {}
    };
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
				<button type="submit">Register</button>
				<Link to="./Login" id="switch">
					<label for="switch">Already registered? Login</label>
				</Link>
			  </footer>

			  <div id="failed">
				<p>Username is already taken! Please try again!</p>
			  </div>

			</form>
		</div>
    );
  }
}
export default Register;

