import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const cnnBlue = '#004D99';
const cnnRed = '#CC0000';

function OfficialsList({ selectedState }) {
  const { loading, error, data } = useQuery(gql`
    {
      officials(address: "${selectedState}, USA") {
        name
        party
        tweets(limit: 5) {
          text
        }
      }
    }`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  const { officials = [] } = data;
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Officials for {selectedState}</h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0
        }}
      >
        {officials.map((official, i) => {
          let partyColor = 'grey';
          if (official.party) {
            if (official.party.indexOf('Republican') > -1) partyColor = cnnRed;
            if (official.party.indexOf('Democrat') > -1) partyColor = cnnBlue;
          }
          return (
            <li
              key={i}
              style={{
                margin: 4,
                width: '100%',
                padding: 10
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    margin: 4,
                    padding: 4,
                    width: 205,
                    border: `1px solid ${partyColor}`,
                    borderRadius: 8,
                    flexDirection: 'column'
                  }}
                >
                  <h4 style={{ color: partyColor }}>{official.name}</h4>
                  <h5 style={{ color: partyColor, margin: 0 }}>
                    {official.party}
                  </h5>
                </div>
                {official.tweets.map(tweet => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        margin: 4,
                        padding: 4,
                        width: 205,
                        border: '1px solid #dfe1e5',
                        borderRadius: 8
                      }}
                    >
                      {tweet.text}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OfficialsList;
