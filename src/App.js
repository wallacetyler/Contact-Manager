import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactList from "./components/contact_list.component";
import AddContact from "./components/add_contact.component";
import UpdateContact from "./components/update_contact.component";

class App extends Component {
  render() {
    return (
<<<<<<< Updated upstream
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" target="_blank">LOGO</a>
            <Link to="/" className="navbar-brand">MERN-Stack Contact Manager</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Contacts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link">Add Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ContactList} />
          <Route path="/update/:id" component={UpdateContact} />
          <Route path="/add" component={AddContact} />
        </div>
      </Router>
=======
			<Router>
				<div className="App">
				  <Route exact path="/" component={Landing} />
				  <Route exact path="/login" component={Login} />
				  <Route exact path="/register" component={Register} />
				  <Route exact path="/AddContact" component={AddContact} />
				  <Route exact path="/ContactList" component={ContactList} />
				  <Route exact path="/UpdateContact" component={UpdateContact} />
				</div>
			</Router>
>>>>>>> Stashed changes
    );
  }
}
export default App;