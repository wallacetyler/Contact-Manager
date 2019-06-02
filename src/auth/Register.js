import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterLogin.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
	  lname: "",
      email: "",
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
      fname: this.state.fname,
	  lname: this.state.lname,
      email: this.state.email,
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

			  <input type="fname" placeholder="First Name" 
				onChange={this.onChange}
				value={this.state.fname}
				error={errors.fname}
				id="fname"
				required/>
			  <input type="lname" placeholder="Last Name" 
				onChange={this.onChange}
				value={this.state.lname}
				error={errors.lname}
				id="lname"
				required/>
			  <input type="email" placeholder="eMail" 
				onChange={this.onChange}
				value={this.state.email}
				error={errors.email}
				id="email"
				required/>
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

			</form>
		</div>
    );
  }
}
export default Register;