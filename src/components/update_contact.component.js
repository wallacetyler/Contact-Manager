import React, { Component } from 'react';

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
		
		fetch('http://localhost:4000/contacts/update',
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
		
		fetch('http://localhost:4000/contacts/find',
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
            <div>
                <p>Welcome to Update Contact Component!!</p>
                <h3 align="center">Update Contact</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeContactName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeContactEmail}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={this.onChangeContactAddress}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.phone}
                                onChange={this.onChangeContactPhone}
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Contact" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}