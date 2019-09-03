import React, { Component } from 'react';
import MapReact from '../components/MapReact.js';
import electionResults from '../static/election-results.json';
import collection from '../static/us-states.json';
import withLayout from '../components/layout.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usStates: [],

      // Below maps array into object for easier lookup
      electionResults: electionResults.reduce((results, usState) => {
        results[usState.StateName] = usState;
        return results;
      }, {})
    };
  }

  handleUsStateClick = usState => {
    // Naive approach to toggling data.
    // TODO: Account for split-vote states
    const { electionResults } = this.state;
    const { StateVotes, Trump } = electionResults[usState];
    if (Trump > 0) {
      electionResults[usState].Trump = '-';
      electionResults[usState].Clinton = StateVotes;
    } else {
      electionResults[usState].Trump = StateVotes;
      electionResults[usState].Clinton = '-';
    }
    this.setState({ electionResults });
  };

  componentDidMount() {
    this.setState({ usStates: collection.features });
  }

  tallyCandidateVotes(candidate) {
    // WOW This works because the object is passed by reference
    return electionResults.reduce((result, state) => {
      if (!isNaN(state[candidate])) {
        result = result + state[candidate];
      }
      return result;
    }, 0);
  }

  render() {
    const cnnBlue = '#004D99';
    const cnnRed = '#CC0000';
    return (
      <div>
        <h2 style={{ color: cnnRed }}>
          {`Trump: ${this.tallyCandidateVotes('Trump')}`}
        </h2>
        <h2 style={{ color: cnnBlue }}>
          {`Clinton: ${this.tallyCandidateVotes('Clinton')}`}
        </h2>
        <MapReact
          usStates={this.state.usStates}
          electionResults={this.state.electionResults}
          stateClick={this.handleUsStateClick}
          svgHeight={800}
          svgWidth={1000}
        />
      </div>
    );
  }
}

export default withLayout(App);
