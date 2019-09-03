import React, { Component } from 'react';
import * as d3 from 'd3';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgHeight: 500,
      svgWidth: 960,
      scale: 1000
    };
  }
  componentDidMount() {
    this.drawMap();
  }

  drawMap = () => {
    const { svgHeight, svgWidth, scale } = this.state;
    const { refs } = this;
    const { handleStateClick } = this.props;

    //D3 projection
    var projection = d3
      .geoAlbersUsa()
      .translate([svgWidth / 2, svgHeight / 2]) // translate to center of the screen
      .scale([scale]); //scale to show entire map

    var path = d3.geoPath().projection(projection);

    d3.json('static/us-states.json').then(function(json) {
      d3.select('svg').remove();

      d3.select(refs.mapDiv)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .selectAll('path')
        .remove()
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .on('click', feature => handleStateClick(feature.properties.NAME))
        .style('stroke', '#747474')
        .style('fill', 'white')
        .style('stroke-width', '1');
    });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div ref="mapDiv" />
      </div>
    );
  }
}
export default Map;
