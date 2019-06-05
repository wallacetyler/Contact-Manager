import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'https://localhost:4000/contacts';
const Contact = props => (
    <tr>
        <td>{props.contact.contact_name}</td>
        <td>{props.contact.contact_email}</td>
        <td>{props.contact.contact_address}</td>
        <td>{props.contact.contact_address}</td>
        <td>
            <Link to={"/edit/"+props.contact._id}>Edit</Link>
        </td>
    </tr>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API)
      .then(result => this.setState({
        hits: result.data.hits,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  contactList() {
        return this.state.hits.map(function(currentContact, i) {
            return <Contact contact={currentContact} key={i} />;
        });
    }

  render() {
    return (
        <div>
            <p>Welcome to Add Contact Component!!</p>
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
        </div>
    )
  }

}

export default App;