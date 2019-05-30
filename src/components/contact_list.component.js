import React, { Component } from 'react';
import axios from 'axios';

const API = 'https://localhost:4000/contacts';

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

  render() {
    return (
        <div>
            <p>Welcome to Add Contact Component!!</p>
        </div>
    )
  }

}

export default App;