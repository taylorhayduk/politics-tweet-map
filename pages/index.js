import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from '../components/apolloClient.js';
import Map from '../components/map';
import OfficialsList from '../components/officialsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Georgia'
    };
  }

  handleStateClick = selectedState => {
    this.setState({ selectedState });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Map handleStateClick={this.handleStateClick} />
          </div>
          <OfficialsList selectedState={this.state.selectedState} />
          <style jsx global>{`
            body {
              font-family: Helvetica Neue, Helvetica, Arial, Utkal, sans-serif;
            }
          `}</style>
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
