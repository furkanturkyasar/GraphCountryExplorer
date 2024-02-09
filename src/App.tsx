import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
    }
  }
`;

interface Country {
  code: string;
  name: string;
}

interface QueryData {
  countries: Country[];
}

interface QueryVars {}

function App() {
  const { loading, error, data } = useQuery<QueryData, QueryVars>(GET_COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const selectItem = (code: string) => {
    setSelectedCountryCode(code);
  };

  return (
    <div>
      <ul>
        {data?.countries.map(({ code, name }) => (
          <li
            key={code}
            style={{
              backgroundColor: selectedCountryCode === code ? 'lightblue' : 'white',
              cursor: 'pointer'
            }}
            onClick={() => selectItem(code)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
