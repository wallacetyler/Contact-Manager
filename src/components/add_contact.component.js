import React, { Component } from 'react';

import "./Contact.css";

var localApiUrl = "http://localhost:4000";
var detachedApiUrl = "http://greatcontactmanager.ddns.net:4000";

export default class AddContact extends Component {
	constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            phone: ''
        }
        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeContactName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeContactEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContactAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeContactPhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

	onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Contact Name: ${this.state.name}`);
        console.log(`Contact Email: ${this.state.email}`);
        console.log(`Contact Address: ${this.state.address}`);
        console.log(`Contact Phone: ${this.state.phone}`);
     
        const newContact = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
			userid: window.location.href.split("?")[1]
        };
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/contacts/add',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newContact)
		})
		.then(() => window.location.href = "/ContactList?" + window.location.href.split("?")[1]);
    }
    render() {
        return (
        	<div class="form" id="form">

	                <header class="header">
						<h2 class="title">Contact Manager</h2>
						<p>Add Contact</p>
					</header>

	                <form id="manager_add" action="" method="post" onSubmit={this.onSubmit}>
	                    <div className="form-group"> 
	                        <input  type="name"
	                                className="form-control"
	                                value={this.state.contact_name}
	                                onChange={this.onChangeContactName}
									placeholder="Name"
	                                />
	                    </div>
	                    <div className="form-group">
	                        <input 
	                                type="email" 
	                                className="form-control"
	                                value={this.state.contact_email}
	                                onChange={this.onChangeContactEmail}
									placeholder="eMail"
	                                />
	                    </div>
	                    <div className="form-group">
	                        <input 
	                                type="address" 
	                                className="form-control"
	                                value={this.state.contact_address}
	                                onChange={this.onChangeContactAddress}
									placeholder="Address"
	                                />
	                    </div>
	                    <div className="form-group">
	                        <input 
	                                type="phonenum" 
	                                className="form-control"
	                                value={this.state.contact_phone}
	                                onChange={this.onChangeContactPhone}
									placeholder="Phone Number"
	                                />
	                    </div>

						<div align="center">
							<footer>
								<button class="contact">
									<input type="submit" id="button" value="Add Contact" className="btn btn-primary" />
									Add Contact
								</button>
							</footer>
						</div>
	                </form>

	        </div>
        )
    }
}
