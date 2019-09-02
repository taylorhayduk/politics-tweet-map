import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../components/apolloClient.js';
import Map from '../components/map';
import OfficialsList from '../components/officialsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Map
          handleStateClick={name => {
            console.log('got map name in index.js: ', name);
          }}
        />
        <OfficialsList />
      </ApolloProvider>
    );
  }
}
export default App;
