import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import FilterInput from './FilterInput';
import CountryList from './CountryList';

const GET_COUNTRIES = gql`
{
  countries {
    code
    name
    continent {
      code
      name
    }
  }
}
`;

interface Country {
  code: string;
  name: string;
  continent: {
    code: string;
    name: string;
  };
}

const CountryFilter: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filter, setFilter] = useState('');
  const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[]>>({});

  useEffect(() => {
    if (data) {
      const parts = filter.split(' ');
      let result: Country[] = data.countries;
      let groupBy = '';

      parts.forEach(part => {
        const [key, value] = part.split(':');
        if (key === 'search' && value) {
          result = result.filter(country => country.name.includes(value));
        } else if (key === 'group' && value) {
          groupBy = value;
        }
      });

      if (groupBy) {
        const groups: Record<string, Country[]> = result.reduce((acc, country) => {
          const groupKey = country[groupBy as keyof Country] as any;
          if (groupKey) {
            const groupName = typeof groupKey === 'object' ? groupKey.name : groupKey;
            acc[groupName] = acc[groupName] || [];
            acc[groupName].push(country);
          }
          return acc;
        }, {} as Record<string, Country[]>);

        setGroupedCountries(groups);
      } else {
        setGroupedCountries({'All': result});
      }
    }
  }, [filter, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <FilterInput setFilter={setFilter} />
      <CountryList groupedCountries={groupedCountries} />
    </div>
  );
}

export default CountryFilter;



