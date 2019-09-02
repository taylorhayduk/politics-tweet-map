import React, { Component } from 'react';

import Map from '../components/map';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Map
          handleStateClick={name => {
            console.log('got map name in index.js: ', name);
          }}
        />
      </div>
    );
  }
}
export default App;
