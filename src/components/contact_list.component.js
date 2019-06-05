import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      error: null,
	  userid: ""
    };
	
	this.addContact = this.addContact.bind(this);
  }

  componentDidMount() {
	  if(!window.location.href.includes('?'))
		  window.location.href = "/Login";
	  
		var idtext = window.location.href.split("?")[1];
		this.setState({userid: idtext});
	
	fetch('http://localhost:4000/contacts/list',
		{
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ uid: idtext })
		})
		.then(response => response.json())
		.then(data => this.setState({
			hits: data
		}));
  }

	addContact(e) {
		e.preventDefault();
		if(!window.location.href.includes('?'))
		  window.location.href = "/Login";
	  
		var idtext = window.location.href.split("?")[1];
		
		window.location.href = "/AddContact?" + idtext;
	}

  contactList() {
	  if(this.state.hits.status === "failure")
		  return;
	  
	  console.log(this.state.hits);
	  
	  var id = this.state.userid;
	  return this.state.hits.map(function(currentContact, i)
	  {
		  return (    
		  <tr>
			<td>{currentContact.name}</td>
			<td>{currentContact.email}</td>
			<td>{currentContact.address}</td>
			<td>{currentContact.phone}</td>
			<td>
				<Link to={"/UpdateContact?" + id + "?" + currentContact._id}>Edit</Link>
			</td>
		</tr>)
	  });
    }

  render() {
    return (
        <div>
            <p>Welcome to Contact List Component!!</p>
            <h3>Contact List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
                </table>
				<input type="submit" value="Add Contact" className="btn btn-primary" onClick={this.addContact}/>
        </div>
    )
  }

}