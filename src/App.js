import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import ContactList from "./components/contact_list.component";
import AddContact from "./components/add_contact.component";
import UpdateContact from "./components/update_contact.component";

class App extends Component {
  render() {
    return (
      <Router>
        <input type="checkbox" id="switch"/>
    
        <form id="login-form" action="" method="post">

          <header class="header">
            <h2 class="title">Contact Manager</h2>
            <p>Login</p> 
          </header>

          <input type="text" placeholder="Username" required/>
          <input type="password" placeholder="Password" required/>
          <footer>
            <button type="submit">Login</button>
            <label for="switch"><span>Register</span></label>
          </footer>
        </form>

        <form id="register-form" action="" method="post">

          <header class="header">
            <h2 class="title">Contact Manager</h2>
            <p>Register</p>
          </header>

          <input type="fname" placeholder="First Name" required/>
          <input type="lname" placeholder="Last Name" required/>
          <input type="email" placeholder="eMail" required/>
          <input type="text" placeholder="Username" required/>
          <input type="password" placeholder="Password" required/>
          <footer>
            <button type="submit">Register</button>
            <label for="switch">Already registered? Login</label>
          </footer>
        </form>
      </Router>
    );
  }
}
export default App;
