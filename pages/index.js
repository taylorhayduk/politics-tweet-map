import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../components/apolloClient.js';
import Map from '../components/map';
import OfficialsList from '../components/officialsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Washington, DC'
    };
  }

  handleStateClick = selectedState => {
    this.setState({ selectedState });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Map handleStateClick={this.handleStateClick} />
        <OfficialsList selectedState={this.state.selectedState} />
      </ApolloProvider>
    );
  }
}
export default App;
