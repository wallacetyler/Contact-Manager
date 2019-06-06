import React, { Component } from 'react';

import "./Contact.css";

var localApiUrl = "http://localhost:4000";
var detachedApiUrl = "http://greatcontactmanager.ddns.net:4000";

export default class UpdateContact extends Component {

	constructor(props) {
        super(props);

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            address: '',
            phone: ''
        }
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
		
        const obj = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        };
		
        console.log(obj);
		
		var uidtext = window.location.href.split("?")[1];
		var cidtext = window.location.href.split("?")[2];
		
		console.log(cidtext + "|" + uidtext);
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/contacts/update',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ 
				uid: uidtext, 
				cid: cidtext, 
				name: this.state.name,
				email: this.state.email,
				address: this.state.address,
				phone: this.state.phone
			})
		})
		.then(response => response.json())
		.then(() => window.location.href = "/ContactList?" + uidtext);
    }
    componentDidMount() {
		
		var uidtext = window.location.href.split("?")[1];
		var cidtext = window.location.href.split("?")[2];
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/contacts/find',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ uid: uidtext, cid: cidtext })
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			email: data.email,
			address: data.address,
			phone: data.phone
		}));
		
    }
    render() {
        return (
            <div class="form" id="form">

                <header class="header">
						<h2 class="title">Contact Manager</h2>
						<p>Edit Contact</p>
				</header>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <input  type="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeContactName}
								placeholder="Name"
                                />
                    </div>
                    <div className="form-group">
                        <input 
                                type="email" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeContactEmail}
								placeholder="eMail"
                                />
                    </div>
                    <div className="form-group"> 
                        <input  type="address"
                                className="form-control"
                                value={this.state.address}
                                onChange={this.onChangeContactAddress}
								placeholder="Address"
                                />
                    </div>
                    <div className="form-group">
                        <input 
                                type="phonenum" 
                                className="form-control"
                                value={this.state.phone}
                                onChange={this.onChangeContactPhone}
								placeholder="Phone Number"
                                />
                    </div>
					
					<div align="center">
						<footer>
							<button class="contact">
								<input type="submit" id="button" value="Update Contact" className="btn btn-primary" />
								Update Contact
							</button>
						</footer>
					</div>
                </form>

            </div>
        )
    }
}
