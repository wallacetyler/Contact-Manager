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
        this.onUpdate = this.onUpdate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);

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
    onUpdate(e) {
        e.preventDefault();
		
		console.log("hi");
		
        const obj = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        };
		
		var blankCounter = 0;
		
		if(obj.name === undefined)
			blankCounter++;
		if(obj.email === undefined)
			blankCounter++;
		if(obj.address === undefined)
			blankCounter++;
		if(obj.phone === undefined)
			blankCounter++;
		
		if(blankCounter > 2)
		{
			alert("Too many blank fields!");
			return;
		}
		else
		{		
			var uidtext = window.location.href.split("?")[1];
			var cidtext = window.location.href.split("?")[2];
			
			
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
    }
	
	onCancel(e)
	{
        e.preventDefault();
		
		console.log("canceling");
		var uidtext = window.location.href.split("?")[1];
		window.location.href = "/ContactList?" + uidtext;
	}
	
	onRemove(e)
	{
        e.preventDefault();
		
		var uidtext = window.location.href.split("?")[1];
		var cidtext = window.location.href.split("?")[2];
		
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		fetch(apiURL + '/contacts/remove',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				cid: cidtext
			})
		})
		.then(response => response.json())
		.then(() => window.location.href = "/ContactList?" + uidtext);
	}
	
    componentDidMount() {
		
		var uidtext = window.location.href.split("?")[1];
		var cidtext = window.location.href.split("?")[2];
		
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
		/*fetch(apiURL + '/contacts/find',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cid: cidtext })
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			email: data.email,
			address: data.address,
			phone: data.phone
		}));
		*/
    }
    render() {
        return (
            <div className="form" id="form">

                <header className="header">
						<h2 className="title">Contact Manager</h2>
						<p>Edit Contact</p>
				</header>

                <form>
                    <div className="form-group"> 
                        <input type="name"
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
                </form>
					
					<div align="center">
						<footer>
							<form onSubmit={this.onUpdate}>
								<button className="contact">
									<input type="submit" id="button" value="Update Contact" className="btn btn-primary" />
									Update Contact
								</button>
							</form>
						</footer>
					</div>
					<div align="center">
						<footer class="button-container">
							<form onSubmit={this.onRemove}>
								<button className="remove">
									<input type="submit" id="button" value="Remove Contact" className="btn remove" />
									Remove Contact
								</button>
							</form>
							<form onSubmit={this.onCancel}>
								<button className="cancel">
									<input type="submit" id="button" value="Cancel Changes" className="btn cancel" />
									Cancel Changes
								</button>
							</form>
						</footer>
					</div>
            </div>
        )
    }
}