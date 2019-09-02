import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

function OfficialsList({ data }) {
  const { officials = [] } = data;
  return (
    <div>
      <h2>Officials</h2>
      <ul>
        {officials.map((official, i) => (
          <li key={i}>
            {official.name} {official.party}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default graphql(gql`
  query {
    officials(address: "washington dc", limit: 2) {
      name
      party
      tweets(limit: 2) {
        text
      }
    }
  }
`)(OfficialsList);
