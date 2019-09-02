import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function OfficialsList({ selectedState }) {
  const { loading, error, data } = useQuery(gql`
    {
      officials(address: "${selectedState}, USA") {
        name
        party
        tweets(limit: 2) {
          text
        }
      }
    }`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

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

export default OfficialsList;
