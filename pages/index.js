import React, { Component } from 'react';
import MapD3 from '../components/MapD3';
import OfficialsList from '../components/officialsList';
import withLayout from '../components/layout.js';

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
      <div>
        <MapD3 handleStateClick={this.handleStateClick} />
        <OfficialsList selectedState={this.state.selectedState} />
      </div>
    );
  }
}
export default withLayout(App);
