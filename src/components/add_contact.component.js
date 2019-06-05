import React, { Component } from 'react';
import axios from 'axios';

export default class AddContact extends Component {
	constructor(props) {
        super(props);

        this.state = {
            contact_name: '',
            contact_email: '',
            contact_address: '',
            contact_phone: ''
        }
        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeContactName(e) {
        this.setState({
            contact_name: e.target.value
        });
    }

    onChangeContactEmail(e) {
        this.setState({
            contact_email: e.target.value
        });
    }

    onChangeContactAddress(e) {
        this.setState({
            contact_address: e.target.value
        });
    }

    onChangeContactPhone(e) {
        this.setState({
            contact_phone: e.target.value
        });
    }

	onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Contact Name: ${this.state.contact_name}`);
        console.log(`Contact Email: ${this.state.contact_email}`);
        console.log(`Contact Address: ${this.state.contact_address}`);
        console.log(`Contact Phone: ${this.state.contact_phone}`);
     
        const newContact = {
            contact_name: this.state.contact_name,
            contact_email: this.state.contact_email,
            contact_address: this.state.contact_address,
            contact_phone: this.state.contact_phone

        };

        axios.post('http://localhost:4000/contacts/add', newContact)
            .then(res => console.log(res.data));
        this.setState({
            contact_name: '',
            contact_email: '',
            contact_address: '',
            contact_phone: ''
        })
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