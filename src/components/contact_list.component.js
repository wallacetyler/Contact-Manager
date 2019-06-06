import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./Contact.css";

const localApiUrl = "http://localhost:4000";
const detachedApiUrl = "http://greatcontactmanager.ddns.net:4000";


export default class ContactList extends Component {
	
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      error: null,
	  userid: "",
	  search: ""
    };
	
	this.addContact = this.addContact.bind(this);
  }

  componentDidMount() {
	  if(!window.location.href.includes('?'))
		  window.location.href = "/Login";
	  
		var idtext = window.location.href.split("?")[1];
		this.setState({userid: idtext});
	
		var apiURL = window.location.href.includes("localhost")?localApiUrl:detachedApiUrl;
	
		fetch(apiURL + '/contacts/list',
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


	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	  };
	  
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
	  var search = this.state.search;
	  return this.state.hits.map(function(currentContact, i)
	  {
		if((currentContact.name !== null && currentContact.name.includes(search)) ||
			(currentContact.email !== null && currentContact.email.includes(search)) ||
			(currentContact.address !== null && currentContact.address.includes(search)) ||
			(currentContact.phone !== null && currentContact.phone.includes(search)))
		{
		  return (    
		  <tr>
			<td>{currentContact.name}</td>
			<td>{currentContact.email}</td>
			<td>{currentContact.address}</td>
			<td>{currentContact.phone}</td>
			<td>
				<Link to={"/UpdateContact?" + id + "?" + currentContact._id}
					style={{
						color: "#e1e1e1",
						fontSize: "15px",
						cursor: "pointer",
						fontFamily: "Century Gothic, CenturyGothic, Geneva, AppleGothic, sans-serif",
					}}>
					Edit</Link>
			</td>
			</tr>)
		}
		else
			return "";
	  });
    }

  render() {
    return (
        <div className="container">

            <header class="header">
				<h2 class="title">Contact Manager</h2>
			</header>

			<input type="text" 
				placeholder="Search" 
				class="search"
				onChange={this.onChange}
				id="search"
				value={this.state.search}/>
				
			<div class="contacts">
                <table align="center">
                    <thead>
                        <tr class="labels">
                            <th width="30%">Name</th>
                            <th width="20%">eMail</th>
                            <th width="20%">Address</th>
                            <th width="20%">Phone</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
				<input type="submit" id="add_contact" value="+ Add Contact" onClick={this.addContact}/>
                </table>
			</div>
        </div>
    )
  }
}