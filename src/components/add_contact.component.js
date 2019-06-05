import React, { Component } from 'react';

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
        	<div>
	            <div>
	                <p>Welcome to Add Contact Component!!</p>
	            </div>
	            <div style={{marginTop: 10}}>
	                <h3>Create New Contact</h3>
	                <form onSubmit={this.onSubmit}>
	                    <div className="form-group"> 
	                        <label>Name: </label>
	                        <input  type="text"
	                                className="form-control"
	                                value={this.state.contact_name}
	                                onChange={this.onChangeContactName}
	                                />
	                    </div>
	                    <div className="form-group">
	                        <label>Email: </label>
	                        <input 
	                                type="text" 
	                                className="form-control"
	                                value={this.state.contact_email}
	                                onChange={this.onChangeContactEmail}
	                                />
	                    </div>
	                    <div className="form-group">
	                        <label>Address: </label>
	                        <input 
	                                type="text" 
	                                className="form-control"
	                                value={this.state.contact_address}
	                                onChange={this.onChangeContactAddress}
	                                />
	                    </div>
	                    <div className="form-group">
	                        <label>Phone: </label>
	                        <input 
	                                type="text" 
	                                className="form-control"
	                                value={this.state.contact_phone}
	                                onChange={this.onChangeContactPhone}
	                                />
	                    </div>

	                    <div className="form-group">
	                        <input type="submit" value="Create Contact" className="btn btn-primary" />
	                    </div>
	                </form>
	            </div>
	        </div>
        )
    }
}