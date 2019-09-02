import * as d3 from 'd3';

const projection = d3.geoAlbersUsa();
const blue = '#2096F3';
const red = '#FF5252';

const DisplayMap = props => {
  const { usStates, svgHeight, svgWidth, stateClick, electionResults } = props;
  console.log('rerendering...');
  return (
    <div>
      <svg width={svgWidth} height={svgHeight}>
        <g className="states">
          {usStates.map((d, i) => {
            const { NAME } = d.properties;
            if (!electionResults[NAME]) return;
            return (
              <path
                key={`path-${i}`}
                onClick={() => stateClick(NAME)}
                d={d3.geoPath().projection(projection)(d)}
                className="state"
                fill={electionResults[NAME].Trump > 0 ? red : blue}
                stroke={'#FFFFFF'}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default DisplayMap;
