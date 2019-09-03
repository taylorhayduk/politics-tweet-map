import * as d3 from 'd3';

const projection = d3.geoAlbersUsa();
const cnnBlue = '#004D99';
const cnnRed = '#CC0000';

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
                fill={electionResults[NAME].Trump > 0 ? cnnRed : cnnBlue}
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
