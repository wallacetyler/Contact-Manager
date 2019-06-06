import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ContactList from "./components/contact_list.component";
import AddContact from "./components/add_contact.component";
import UpdateContact from "./components/update_contact.component";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
			<Router>
				<div className="App">
				  <Route exact path="/" component={Landing} />
				  <Route exact path="/login" component={Login} />
				  <Route exact path="/register" component={Register} />
				  <Route exact path="/ContactList" component={ContactList} />
				  <Route exact path="/AddContact" component={AddContact} />
				  <Route exact path="/UpdateContact" component={UpdateContact} />
				</div>
			</Router>
    );
  }
}
export default App;
