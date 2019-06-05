import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateContact extends Component {
	constructor(props) {
        super(props);

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            contact_name: '',
            contact_email: '',
            contact_address: '',
            contact_phone: ''
        }
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
        const obj = {
            contact_name: this.state.contact_name,
            contact_email: this.state.contact_email,
            contact_address: this.state.contact_address,
            contact_phone: this.state.contact_phone
        };
        console.log(obj);
        axios.post('http://localhost:4000/contacts/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }
    componentDidMount() {
        axios.get('http://localhost:4000/contacts/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    contact_name: response.data.contact_name,
                    contact_email: response.data.contact_email,
                    contact_address: response.data.contact_address,
                    contact_phone: response.data.contact_phone
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.contact_email}
                                onChange={this.onChangeContactEmail}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_address}
                                onChange={this.onChangeContactAddress}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.contact_phone}
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