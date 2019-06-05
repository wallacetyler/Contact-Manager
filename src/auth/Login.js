import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./RegisterLogin.css";

class Login extends Component {
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

	const userData = {
      user: this.state.user,
      password: this.state.password
    };

	console.log(userData);
  };

  render() {
    const { errors } = this.state;
	return (
      <div className="container">

		<header class="header">
            <h2 class="title">Contact Manager</h2>
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
            <button type="submit">Login</button>
			<Link to="./Register" id="switch">
				<label for="switch"><span>Need an account? Register</span></label>
			</Link>
          </footer>

		  <div id="failed">
			<p>Incorrect login or password! Please try again!</p>
		  </div>

        </form>
      </div>
    );
  }
}
export default Login;
